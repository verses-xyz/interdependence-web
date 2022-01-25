// Arweave and Ethereum signing utilities.
import Arweave from 'arweave';
import {ethers} from "ethers";

function init() {
  return Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });
}

const arweave = init();

// const ADMIN_ACCT = "aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs";
// const DOC_TYPE = "interdependence_doc_type";
// const DOC_ORIGIN = "interdependence_doc_origin";
// const DOC_REF = "interdependence_doc_ref";
// const SIG_NAME = "interdependence_sig_name";
// const SIG_HANDLE = "interdependence_sig_handle";
// const SIG_ADDR = "interdependence_sig_addr";
// const SIG_ISVERIFIED = "interdependence_sig_verified";
// const SIG_SIG = "interdependence_sig_signature";

const ADMIN_ACCT = "7PJVjPh9DJ0OOYtdb6bkVXEnBx2tebKb7VlrqPxdwbc";
const DOC_TYPE = "charter_doc_type";
const DOC_REF = "charter_doc_ref";
const SIG_NAME = "charter_sig_name";
const SIG_HANDLE = "charter_sig_handle";
const SIG_ADDR = "charter_sig_addr";
const SIG_ISVERIFIED = "charter_sig_verified";
const SIG_SIG = "charter_sig_signature";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

const jsonOrErrorHandler = async response => {
  const resp = response.json()
  if (response.ok) {
    return resp;
  }

  if (resp) {
    const error = await resp
    throw new Error(error.message ?? error.errors[0].message)
  } else {
    throw new Error('Internal server error')
  }
}

export async function generateSignature(charter) {
  if (!window.ethereum) {
    throw new Error("No wallet found. Please install Metamask or another Web3 wallet provider.");
  }

  // Sign the charter. Any errors here should be handled by the caller.
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(charter.trim())
}

const cleanHandle = handle => handle[0] === "@" ? handle.substring(1) : handle;

export async function signCharter(txId, name, userProvidedHandle, charter, signature) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Verify the signature, and print to console for convenience
  const verifyingAddress = ethers.utils.verifyMessage(charter.trim(), signature);
  if (verifyingAddress !== address) {
    throw new Error("Signature mismatch")
  }

  const formData = new URLSearchParams({
    name,
    address,
    signature,
    handle: cleanHandle(userProvidedHandle),
  });

  await fetch(`${SERVER_URL}/sign/${txId}`, {
    method: 'post',
    body: formData,
  }).then(jsonOrErrorHandler)
}

export async function verifyTwitter(sig, handle) {
  const formData = new URLSearchParams({
    address: sig,
  });

  return fetch(`${SERVER_URL}/verify/${cleanHandle(handle)}`, {
    method: 'post',
    body: formData,
  }).then(jsonOrErrorHandler)
}

{/* 
Transactions are mined into Arweave blocks in 60 mins
So signature query order is roughly buckets by that
*/}
export async function fetchSignatures(txId) {
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
          first: 50,
          sort: HEIGHT_ASC,
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
          owners: ["${ADMIN_ACCT}"],
        ) {
          edges {
            cursor
            node {
              id
              tags {
                name
                value
              }
              block {
                  id
                  timestamp
                  height
              }
            }
          }
        }
      }
      `
    })
  }).then(jsonOrErrorHandler);

  const safeTag = (node, tagName, defaultValue) => {
    const tag = node.tags.find(tag => tag.name === tagName)
    return tag ? tag.value : defaultValue;
  }

  return req.data.transactions.edges.flatMap(nodeItem => {
    const cursor = nodeItem.cursor;
    const n = nodeItem.node;
    const sig = safeTag(n, SIG_ADDR, "UNKWN");
    const handle = safeTag(n, SIG_HANDLE, "UNSIGNED");
    const verified = safeTag(n, SIG_ISVERIFIED, 'false') === 'true'

    return [{
      CURSOR: cursor,
      SIG_ID: n.id,
      SIG_ADDR: sig,
      SIG_NAME: safeTag(n, SIG_NAME, "Anonymous"),
      SIG_HANDLE: handle === 'null' ? 'UNSIGNED' : handle,
      SIG_ISVERIFIED: verified,
      SIG_SIG: safeTag(n, SIG_SIG, "UNKWN"),
    }];
  });
}

export function dedupe(sigs) {
  const unique_set = sigs.reduce((total, cur) => {
    if (!total.hasOwnProperty(cur.SIG_ADDR)) {
      // unique addr
      total[cur.SIG_ADDR] = cur
    } else {
      const old = total[cur.SIG_ADDR]
      // dupe, can overwrite it current one is verified or old one is not verified
      if (cur.SIG_ISVERIFIED || !old.SIG_ISVERIFIED) {
        total[cur.SIG_ADDR] = cur
      }
    }
    return total
  }, {})
  return Object.values(unique_set)
}

export function compareSigs(snapAddrs, sigs) {
  const addrScores = [];
  snapAddrs.forEach((addr, index) => {

    var score = 0

    const checkAddr = obj => obj.SIG_ADDR === addr;
    if (sigs.some(checkAddr)) score = 1

    const scoreJSON = {"score":score, "address":addr}
    addrScores.push(scoreJSON)
  })
  return addrScores
}

export function sortSigs(sigs) {
  // const TEAM = {
  //   "": -10,
  //   "": -9,
  //   "": -8,
  //   "": -7,
  //   "": -6,
  //   "": -5,
  //   "": -4,
  //   "": -3,
  //   "": -2,
  // }

  // const priority = sig => {
  //   if (sig.SIG_ADDR in TEAM) {
  //     return TEAM[sig.SIG_ADDR]
  //   }
  //   return 1
  // }

  // return sigs.sort((a, b) => priority(a) - priority(b));
  return sigs;
}

export async function getCharter(txId) {
  const res = {
    txId,
    data: {},
    sigs: [],
    status: 404,
  };
  const txStatus = await arweave.transactions.getStatus(txId);
  if (txStatus.status !== 200) {
    res.status = txStatus.status;
    return res;
  }

  const transactionMetadata = await arweave.transactions.get(txId);
  const tags = transactionMetadata.get('tags').reduce((prev, tag) => {
    let key = tag.get('name', {decode: true, string: true});
    prev[key] = tag.get('value', {decode: true, string: true});
    return prev;
  }, {});

  // ensure correct type, return undefined otherwise
  if (!(DOC_TYPE in tags) || !['document', 'charter'].includes(tags[DOC_TYPE])) {
    return res;
  }

  // otherwise metadata seems correct, go ahead and fetch
  const blockId = txStatus.confirmed.block_indep_hash;
  const blockMeta = await arweave.blocks.get(blockId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const time = new Date(blockMeta.timestamp * 1000);
  const data = JSON.parse(await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  }));
  data.body = data.document || data.charter // backwards compatability

  res.data = {
    ...data,
    timestamp: time.toLocaleDateString('en-US', options),
  };

  res.status = 200;
  return res;
}
