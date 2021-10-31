import Arweave from 'arweave'

function init() {
  return Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: true,     // Enable network request logging
  })
}

const DOC_TYPE = "interdependence_doc_type"
const DOC_ORIGIN = "interdependence_doc_origin"
const DOC_REF = "interdependence_doc_ref"
const SIG_NAME = "interdependence_sig_name"
const SIG_HANDLE = "interdependence_sig_handle"

export async function forkDeclaration(oldTxId, newText, key) {
  const arweave = init()
  let transaction = await arweave.createTransaction({
    data: newText
  }, key)
  transaction.addTag(DOC_TYPE, 'declaration')
  transaction.addTag(DOC_ORIGIN, oldTxId)
  await arweave.transactions.sign(transaction, key)
  return await arweave.transactions.post(transaction)
}

export async function signDeclaration(txId, name, handle, key) {
  const arweave = init()
  // empty transaction, just attach tags
  let transaction = await arweave.createTransaction({ data: "" }, key)
  transaction.addTag(DOC_TYPE, 'signature')
  transaction.addTag(DOC_REF, txId)
  transaction.addTag(SIG_NAME, name)
  transaction.addTag(SIG_HANDLE, handle)
  await arweave.transactions.sign(transaction, key)
  return await arweave.transactions.post(transaction)
}

async function fetchSignatures(txId) {
  const req = await fetch('https://arweave.net/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query {
        transactions(
          tags: [
            {
              name: "${DOC_TYPE}",
              values: ["signature"]
            },
            {
              name: "${DOC_REF}",
              values: ["${txId}"]
            }
          ]
        ) {
          edges {
            node {
              id
              signature
              tags {
                name
                value
              }
              block {
                timestamp
              }
            }
          }
        }
      }
      `
    })
  })
  
  const json = await req.json()
  return json.data.transactions.edges.map(nodeItem => ({
    SIG_TX: nodeItem.signature,
    SIG_NAME: nodeItem.node.tags.find(tag => tag.name === SIG_NAME).value,
    SIG_HANDLE: nodeItem.node.tags.find(tag => tag.name === SIG_HANDLE).value
  }))
}

export async function getDeclaration(txId) {
  const arweave = init()
  const transactionMetadata = await arweave.transactions.get(txId)
  const tags = transactionMetadata.get('tags').reduce((prev, tag) => {
    let key = tag.get('name', {decode: true, string: true})
    prev[key] = tag.get('value', {decode: true, string: true})
    return prev
  }, {});

  // ensure correct type, return undefined otherwise
  if (!(DOC_TYPE in tags) || tags[DOC_TYPE] !== 'declaration') {
    return undefined
  }

  // otherwise metadata seems correct, go ahead and fetch
  const data = await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  })

  // fetch associated signatures
  const sigs = await fetchSignatures(txId)
  return {
    data,
    sigs,
  }
}