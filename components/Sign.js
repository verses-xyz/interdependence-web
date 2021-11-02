import React from 'react'
import { useForm } from 'react-hook-form'
import { signDeclaration } from "../arweaveFns"
import Modal from "react-modal";
import Button from "./core/Button";
import {useMetaMask} from "metamask-react";

Modal.setAppElement('#__next');
Modal.defaultStyles.overlay.backgroundColor = '#555555aa';

const customStyles = {
  content: {
    top: '10vh',
    left: '25vw',
    right: 'auto',
    bottom: 'auto',
    width: '50vw',
    height: '80vh',
    marginRight: '-50%',
    borderColor: '#e5e7eb',
    borderRadius: '0.75em',
    padding: '0',
  },
};

export default function Sign({ txId, content }) {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { status, connect, account } = useMetaMask();

  // TODO: switch on status and display appropriate error messages
  // cases:
  // - unavailable -> no metamask, disable button
  // - notConnected -> ok to sign
  // - connected -> ready to sign
  // TODO: check if user already signed using this wallet

  function openModal() {
    setIsOpen(true);
    if (status === "notConnected") {
      connect()
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data) =>
    signDeclaration(txId, data.name, account, data.handle);

  return (
    <div>
      <p className="md:text-justify font-mono">
        If you'd like to endorse this declaration, you can sign the declaration by clicking the button below. Signatures will become part of this document's permanent history on the Arweave blockchain.
      </p>
      <Button
        primary
        onClick={openModal}>
        Sign
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="sign-modal"
      >
        <div className="items-center justify-center border-2 border-brown-20 rounded-md" >
          <h2 className="rounded-t-md bg-brown-80 font-mono py-2"> Sign the Declaration </h2>
          <div className="border-t-2 px-2 py-4 border-brown-20">
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
        </div>
      </Modal>
    </div>
  )

}
