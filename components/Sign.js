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

  return <form className="flex flex-col items-center justify-center w-16" onSubmit={handleSubmit(onSubmit)}>
    <label>Name: <input type="text" {...register("name")}/></label>
    <label>Twitter Handle: <input type="text"{...register("handle")}/></label>
    <button>Sign</button>
  </form>
}