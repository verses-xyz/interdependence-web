import Arweave from 'arweave'

function init() {
  return Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: true,
  })
}

const arweave = init()

const ADMIN_ACCT = "aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs"
const DOC_TYPE = "interdependence_doc_type"
const DOC_ORIGIN = "interdependence_doc_origin"
const DOC_REF = "interdependence_doc_ref"
const SIG_NAME = "interdependence_sig_name"
const SIG_HANDLE = "interdependence_sig_handle"

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8080"

export async function forkDeclaration(oldTxId, newText, authors) {
  const formData = new URLSearchParams({
    authors: JSON.stringify(authors),
    newText,
  })

  return fetch(`${SERVER_URL}/fork/${oldTxId}`, {
    method: 'post',
    body: formData,
  }).then(data => data.json())
}

export async function signDeclaration(txId, name, address, handle) {
  const formData = new URLSearchParams({
    name,
    address,
    handle
  })

  return fetch(`${SERVER_URL}/sign/${txId}`, {
    method: 'post',
    body: formData,
  }).then(data => data.json())
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
          ],
          owners: ["${ADMIN_ACCT}"]
        ) {
          edges {
            node {
              id
              owner {
                address
              }
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

  const unique_tx = new Set()
  return json.data.transactions.edges.flatMap(nodeItem => {
    const n = nodeItem.node
    const sig = n.owner.address

    if (unique_tx.has(sig)) {
      return []
    }

    unique_tx.add(sig)
    return [{
      SIG_ID: n.id,
      SIG_TX: sig,
      SIG_NAME: n.tags.find(tag => tag.name === SIG_NAME).value,
      SIG_HANDLE: n.tags.find(tag => tag.name === SIG_HANDLE).value,
    }]
  })
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