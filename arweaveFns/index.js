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

export async function forkDeclaration(oldTxId, newText, authors) {
  const formData = new URLSearchParams({
    authors: JSON.stringify(authors),
    newText,
  });

  return fetch(`${SERVER_URL}/fork/${oldTxId}`, {
    method: 'post',
    body: formData,
  }).then(data => data.json());
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
  }).then(data => data.json()).catch((err) => {
    throw err;
  });
}

export async function verifyTwitter(sig, handle) {
  const formData = new URLSearchParams({
    address: sig,
  });

  return fetch(`${SERVER_URL}/verify/${cleanHandle(handle)}`, {
    method: 'post',
    body: formData,
  }).then(data => data.json());
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
  });

  const json = await req.json();

  const unique_tx = new Set();
  return json.data.transactions.edges.reverse().flatMap(nodeItem => {
    const n = nodeItem.node;
    const sig = n.tags.find(tag => tag.name === SIG_ADDR).value;
    const handle = n.tags.find(tag => tag.name === SIG_HANDLE).value;
    const verified = n.tags.find(tag => tag.name === SIG_ISVERIFIED).value === 'true'

    if (unique_tx.has(sig) && !verified) {
      return [];
    }

    unique_tx.add(sig);

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

  // fetch associated signatures
  try {
    const sigs = await fetchSignatures(txId);
    const FIRST_SIGNER = '0x29668d39c163f64a1c177c272a8e2d9ecc85f0de'.toUpperCase(); // jasminewang.eth
    sigs.sort((a, b) => {
      if (a.SIG_ADDR === FIRST_SIGNER) return -1;
      if (b.SIG_ADDR === FIRST_SIGNER) return 1;
      return 0;
    });
    res.sigs = sigs;
  } catch (err) {
    // couldn't fetch signatures
    console.error(err)
  }

  res.status = 200;
  return res;
}
