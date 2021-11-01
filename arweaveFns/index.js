import Arweave from 'arweave'

function init() {
  return Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  })
}

const arweave = init()

const DOC_TYPE = "interdependence_doc_type"
const DOC_ORIGIN = "interdependence_doc_origin"
const DOC_REF = "interdependence_doc_ref"
const SIG_NAME = "interdependence_sig_name"
const SIG_HANDLE = "interdependence_sig_handle"

export async function forkDeclaration(oldTxId, newText, authors, key) {
  let transaction = await arweave.createTransaction({
    data: JSON.stringify({
      declaration: newText,
      authors: authors
    })
  }, key)
  transaction.addTag(DOC_TYPE, 'declaration')
  transaction.addTag(DOC_ORIGIN, oldTxId)
  await arweave.transactions.sign(transaction, key)
  return {
    ...await arweave.transactions.post(transaction),
    id: transaction.id,
  }
}

export async function signDeclaration(txId, name, handle, key) {
  // empty transaction, just attach tags
  let transaction = await arweave.createTransaction({ data: handle }, key)
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
            }
          }
        }
      }
      `
    })
  })

  const json = await req.json()
  return json.data.transactions.edges.map(nodeItem => ({
    SIG_ID: nodeItem.node.id,
    SIG_TX: nodeItem.node.signature,
    SIG_NAME: nodeItem.node.tags.find(tag => tag.name === SIG_NAME).value,
    SIG_HANDLE: nodeItem.node.tags.find(tag => tag.name === SIG_HANDLE).value,
  }))
}

export async function getDeclaration(txId) {
  const res = {
    txId,
    data: {},
    sigs: [],
    status: 404,
  }
  const txStatus = await arweave.transactions.getStatus(txId)
  if (txStatus.status !== 200) {
    res.status = txStatus.status
    return res
  }

  const transactionMetadata = await arweave.transactions.get(txId)
  const tags = transactionMetadata.get('tags').reduce((prev, tag) => {
    let key = tag.get('name', {decode: true, string: true})
    prev[key] = tag.get('value', {decode: true, string: true})
    return prev
  }, {})

  // ensure correct type, return undefined otherwise
  if (!(DOC_TYPE in tags) || tags[DOC_TYPE] !== 'declaration') {
    return res
  }

  // otherwise metadata seems correct, go ahead and fetch
  const blockId = txStatus.confirmed.block_indep_hash
  const blockMeta = await arweave.blocks.get(blockId)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const time = new Date(blockMeta.timestamp * 1000)
  res.data = {
    ...JSON.parse(await arweave.transactions.getData(txId, {
      decode: true,
      string: true,
    })),
    timestamp: time.toLocaleDateString('en-US', options),
  }

  // fetch associated signatures
  res.sigs = await fetchSignatures(txId)
  res.status = 200
  return res
}