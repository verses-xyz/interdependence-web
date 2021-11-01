import React from 'react'
import { useForm } from 'react-hook-form'
import { signDeclaration } from "../arweaveFns"

export default function Sign({ txId, walletKey }) {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) =>
    signDeclaration(txId, data.name, data.handle, walletKey)
      .then(data => console.log(data.data));

  return (

    <div className="items-center justify-center border-2 border-brown-20 rounded-md" > 
      <h2 className="bg-brown-80 font-mono py-2"> Sign the Declaration </h2>
      <div className="border-t-2 px-2 py-4 border-brown-20"> 

      <p className="font-mono text-light font-body p-4"> 
        If you'd like to endorse this vision for cyberspace, you can sign the declaration by following the instructions below. Signatures will become part of this document's permanent history on the Arweave blockchain. 
        ---
        <ul>
          <li>
          1. Install the Arweave wallet extension
          </li>
          
          <li>
            2. Get free $AR from the Arweave faucet
          </li>
          
          <li> 3. Sign below</li>
        </ul>
        </p>

      {/* TODO fix layout here: 

      */}
      <form className="ml-40 flex flex-col items-center justify-center w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <input className="focus:outline-none border-b-2 px-1 py-2" type="text" {...register("name")} placeholder="Name / Alias" />
        <input className="focus:outline-none border-b-2 px-1 py-2" type="text"{...register("handle")} placeholder="Twitter Handle"/>
      
      <button className="mt-5 px-6 py-2 rounded-lg bg-brown-20 text-white text-md"> 
        <p className="font-mono">
          Sign
        </p>
      </button>
    </form>
    </div>
  </div> )

}