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

    <div className="items-center justify-center border-2 rounded-md p-10"> 
      <div className="px-10"> 
      
      </div>

      <form className="ml-20 flex flex-col items-center justify-center w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <input className="focus:outline-none border-b-2 px-1 py-2" type="text" {...register("name")} placeholder="Name / Alias" />
        <input className="focus:outline-none border-b-2 px-1 py-2" type="text"{...register("handle")} placeholder="Twitter Handle"/>
      
      <button className="mt-5 px-6 py-2 rounded-lg bg-brown-20 text-white text-md"> 
        <p className="font-mono">
          Sign
        </p>
      </button>
    </form>
  </div> )

}