export default function Signatures({sigs}) {
  return <>
    <h2 className="font-body">Signatures</h2>
    <div>
      {sigs.map(sig => <div className="font-body" key={sig.SIG_HANDLE}>
        <h3>{sig.SIG_NAME}, @{sig.SIG_HANDLE}</h3>
        <a href={`https://arweave.net/tx/${sig.SIG_ID}`}>tx: {sig.SIG_TX.slice(0, 30)}</a>
      </div>)}
    </div>
  </>
}