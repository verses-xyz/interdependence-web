import Box from "./core/Box";
import Checkmark from './core/icons/Checkmark';

const cleanHandle = (handle, address, verified) => {
  if (verified) {
    if (handle.length === 0) {
      return handle;
    } else {
      const firstChar = handle[0];
      return firstChar === "@" ? handle : '@' + handle;
    }
  }
  return address.slice(0, 8);
}

export default function Signatures({sigs}) {
  return (
    <Box
      title={`${sigs.length} Signature${sigs.length !== 1 ? 's' : ''}`}
      content={sigs.map((sig, index) => <div className="font-mono" key={sig.SIG_HANDLE}>
        <div className={"space-x-0 flex py-4 md:space-x-4 sm:py-2 md:py-4 overflow-hidden" + (index === sigs.length - 1 ? "" : " border-b")}>

          {/*<h3 className="py-2 text-left">*/}
          {/*  {<a target="_blank" className="hover:underline" href={`https://etherscan.io/address/${sig.SIG_ADDR}`}>{sig.SIG_NAME || 'Anonymous'}</a>}*/}
          {/*  <div className="inline-block -my-2 py-1 px-3 ml-3 text-sm rounded-3xl text-brown-120 bg-gray-200 overflow-hidden md:visible">*/}
          {/*    {<a target="_blank" className="hover:underline" href={`https://etherscan.io/address/${sig.SIG_ADDR}`}>{sig.SIG_ADDR.slice(0, 6)}</a>}*/}
          {/*  </div>*/}
          {/*</h3>*/}
          {/*<div className="flex-1">*/}
          {/*</div>*/}
          {/*<div className="py-2">*/}
          {/*  <div className="inline-block -my-2 py-1 px-4 text-sm rounded-3xl text-brown-120 bg-gray-200 overflow-hidden md:visible">*/}
          {/*    {sig.SIG_SIGNATURE.slice(0, 10)}&hellip;*/}
          {/*  </div>*/}
          {/*</div>*/}

          <h3 className="py-2 text-left">
            {sig.SIG_HANDLE ?
             <a target="_blank" className="hover:underline" href={`https://twitter.com/${sig.SIG_HANDLE}`}>{sig.SIG_NAME || 'Anonymous'}</a>
             : sig.SIG_NAME}
          </h3>
          <div className="mt-2.5">
            {sig.SIG_ISVERIFIED && <Checkmark filled />}
          </div>
          <div className="flex-1"/>
          {sig.SIG_ID && <a
            target="_blank"
            className="invisible py-2 px-4 text-gray-120 overflow-hidden lg:visible"
            href={`https://arweave.net/tx/${sig.SIG_ID}`}>TX: {sig.SIG_ID.slice(0, 6)}</a>}
          <p
            className="invisible py-2 px-4 rounded-3xl text-brown-120 bg-gray-200 overflow-hidden md:visible">{
              sig.SIG_ISVERIFIED ?
              cleanHandle(sig.SIG_HANDLE, sig.SIG_ADDR, sig.SIG_ISVERIFIED) :
              sig.SIG_SIG.slice(0, 10)
            } </p>
        </div>
      </div>)}
    />
  );
}
