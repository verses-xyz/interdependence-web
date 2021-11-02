import Box from "./core/Box";
import Checkmark from './core/Checkmark';

const cleanHandle = (handle, address, verified) => {
  if (verified) {
    if (handle.length === 0) {
      return handle;
    } else {
      const firstChar = handle[0];
      return firstChar === "@" ? handle : '@' + handle;
    }
  }
  return address.slice(0, 8)
}

export default function Signatures({sigs}) {
  return (
    <Box
      title={`${sigs.length} Signature${sigs.length !== 1 ? 's' : ''}`}
      content={sigs.map((sig, index) => <div className="font-mono" key={sig.SIG_HANDLE}>
        <div className={"space-x-0 flex py-4 md:space-x-4 sm:py-1 md:py-4 overflow-hidden" +
                        (index === sigs.length - 1 ? "" : " border-b")}>
          <h3 className="py-2 text-left">
            <a target="_blank" className="hover:underline" href={`https://twitter.com/${sig.SIG_HANDLE}`}>{sig.SIG_NAME}  </a>
          </h3>
          <div className="mt-2.5">
            {sig.SIG_ISVERIFIED && <Checkmark filled />}
          </div>
          <div className="flex-1"/>
          <a
            target="_blank"
            className="invisible py-2 px-4 text-brown-120 overflow-hidden lg:visible"
            href={`https://arweave.net/tx/${sig.SIG_ID}`}>TX: {sig.SIG_ID.slice(0, 6)}</a>
          <a
            target="_blank"
            className="invisible py-2 px-4 rounded-3xl text-brown-120 bg-gray-200 overflow-hidden md:visible"
            href={`https://etherscan.io/address/${sig.SIG_ADDR}`}>{
              cleanHandle(sig.SIG_HANDLE, sig.SIG_ADDR, sig.SIG_ISVERIFIED)
            } </a>
        </div>
      </div>)}
    />
  );
}
