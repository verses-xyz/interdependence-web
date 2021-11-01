export default function Signatures({sigs}) {

  {/* TODO 
   - Add number of signatures
  
  */ }
  return <>
  <div className="mt-5 border-2 rounded-lg min-w-1/2">
    <h2 className="font-mono py-2 bg-brown-80"> {sigs.length} Signature</h2>
    <div className="border-t-2 p-10">
      {sigs.map(sig => <div className="font-body" key={sig.SIG_HANDLE}>

        
        <div className="flex flex-row space-x-10 border-b-2 py-2"> 
          <h3 className="font-mono">{sig.SIG_NAME} </h3>
          {/* <a href={`https://arweave.net/tx/${sig.SIG_ID}`}>tx: {sig.SIG_TX.slice(0, 30)}</a> */}
          <a 
            className="px-2 rounded-xl bg-brown-80"
            href={`https://arweave.net/tx/${sig.SIG_ID}`}> @{sig.SIG_HANDLE} </a>

        </div>

      </div>)}
    </div>
    </div>
  </>
}