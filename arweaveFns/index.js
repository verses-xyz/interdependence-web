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

const ADMIN_ACCT = "aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs";
const DOC_TYPE = "interdependence_doc_type";
const DOC_ORIGIN = "interdependence_doc_origin";
const DOC_REF = "interdependence_doc_ref";
const SIG_NAME = "interdependence_sig_name";
const SIG_HANDLE = "interdependence_sig_handle";
const SIG_ADDR = "interdependence_sig_addr";
const SIG_ISVERIFIED = "interdependence_sig_verified";
const SIG_SIG = "interdependence_sig_signature";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

const jsonOrErrorHandler = response => {
  if (response.ok) {
    return response.json();
  }

  throw new Error('Internal server error');
}

export async function forkDeclaration(oldTxId, newText, authors) {
  const formData = new URLSearchParams({
    authors: JSON.stringify(authors),
    newText,
  });

  return fetch(`${SERVER_URL}/fork/${oldTxId}`, {
    method: 'post',
    body: formData,
  }).then(jsonOrErrorHandler)
}

export async function generateSignature(declaration) {
  if (!window.ethereum) {
    throw new Error("No wallet found. Please install Metamask or another Web3 wallet provider.");
  }

  // Sign the declaration. Any errors here should be handled by the caller.
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(declaration.trim())
}

const cleanHandle = handle => handle[0] === "@" ? handle.substring(1) : handle;

export async function signDeclaration(txId, name, userProvidedHandle, declaration, signature) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Verify the signature, and print to console for convenience
  const verifyingAddress = ethers.utils.verifyMessage(declaration.trim(), signature);
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

  const unique_tx = new Set();
  const unique_verif_tx = new Set();
  return req.data.transactions.edges.flatMap(nodeItem => {
    const n = nodeItem.node;
    const sig = n.tags.find(tag => tag.name === SIG_ADDR).value;
    const handle = n.tags.find(tag => tag.name === SIG_HANDLE).value;
    const verified = n.tags.find(tag => tag.name === SIG_ISVERIFIED).value === 'true'

    if (verified) {
      if (unique_verif_tx.has(sig)) {
        return [];
      }
      unique_verif_tx.add(sig);
    } else {
      if (unique_tx.has(sig)) {
        return [];
      }
      unique_tx.add(sig);
    }

    return [{
      SIG_ID: n.id,
      SIG_ADDR: sig,
      SIG_NAME: n.tags.find(tag => tag.name === SIG_NAME).value,
      SIG_HANDLE: handle === 'null' ? 'UNSIGNED' : handle,
      SIG_ISVERIFIED: verified,
      SIG_SIG: n.tags.find(tag => tag.name === SIG_SIG)?.value || "",
    }];
  });
}

export async function getSigs(txId) {
  const TEAM = {
    "0x29668d39c163f64a1c177c272a8e2D9ecc85F0dE": -8,
    "0x35E61b11f1c05271B9369E324d6b4305f6aCB639": -7,
    "0xbb806e75c7e71AD07dbEfd2B1B5DA2689A147340": -6,
    "0x8416146b19e755B7Ad75914a57a2c77ca894B4DC": -5,
    "0x6f9627aF4313508a4FB7E53577F7Fc55297A40A0": -4,
    "0x34C3A5ea06a3A67229fb21a7043243B0eB3e853f": -3,
    "0x99ed527BE6DF7a8196cECfE568ca03BC08863Ea5": -2,
  }

  const sigs = await fetchSignatures(txId);
  const priority = sig => {
    if (sig.SIG_ADDR in TEAM) {
      return TEAM[sig.SIG_ADDR]
    }
    if (sig.SIG_ISVERIFIED) {
      return -1
    }
    return 1
  }

  return sigs.sort((a, b) => priority(a) - priority(b));
}

export async function getDeclaration(txId) {
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
  if (!(DOC_TYPE in tags) || tags[DOC_TYPE] !== 'declaration') {
    return res;
  }

  // otherwise metadata seems correct, go ahead and fetch
  const blockId = txStatus.confirmed.block_indep_hash;
  const blockMeta = await arweave.blocks.get(blockId);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const time = new Date(blockMeta.timestamp * 1000);
  const data = await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  });
  res.data = {
    ...JSON.parse(data),
    timestamp: time.toLocaleDateString('en-US', options),
  };

  res.status = 200;
  return res;
}
