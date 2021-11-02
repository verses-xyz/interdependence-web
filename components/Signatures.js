import Box from "./core/Box";

const cleanHandle = handle => {
  if (handle.length === 0) {
    return handle;
  } else {
    const firstChar = handle[0];
    return firstChar === "@" ? handle.slice(1) : handle;
  }
}

export default function Signatures({sigs}) {
  return (
    <Box
      title={`${sigs.length} Signature${sigs.length !== 1 && 's'}`}
      content={sigs.map((sig, index) => <div className="font-mono" key={sig.SIG_HANDLE}>
        <div className={"space-x-0 flex py-4 md:space-x-4 sm:py-1 md:py-4 overflow-hidden" +
                        (index === sigs.length - 1 ? "" : " border-b")}>
          <h3 className="py-2 text-left">
            <a target="_blank" className="hover:underline" href={`https://twitter.com/${sig.SIG_HANDLE}`}>{sig.SIG_NAME}</a>
          </h3>
          <div className="flex-1"/>
          <a
            target="_blank"
            className="py-2 px-4 rounded-3xl text-brown-120 bg-gray-200 hover:text-brown-20 overflow-hidden md:visible"
            href={`https://viewblock.io/arweave/address/${sig.SIG_TX}`}> @{cleanHandle(sig.SIG_HANDLE)} </a>
          <a
            target="_blank"
            className="hidden xl:block py-2 px-4 rounded-3xl text-brown-120 bg-gray-200 hover:text-brown-20 overflow-hidden lg:visible"
            href={`https://arweave.net/tx/${sig.SIG_ID}`}>{sig.SIG_ID.slice(0, 6)}</a>
          {/* <a
            className="pr-8 visible rounded-4xl text-brown-120 overflow-hidden md:invisible"
            href={`https://viewblock.io/arweave/address/${sig.SIG_TX}`}> @ </a> */}
        </div>
      </div>)}
    />
  );
}
