import React from 'react';
import { useForm } from 'react-hook-form';
import { signDeclaration } from "../arweaveFns";
import Modal from "react-modal";
import Button from "./core/Button";
import {useMetaMask} from "metamask-react";
import Box from "./core/Box";
import ScaleLoader from "react-spinners/ScaleLoader";

Modal.setAppElement('#__next');
Modal.defaultStyles.overlay.backgroundColor = '#555555aa';

const customStyles = {
  content: {
    top: '10vh',
    left: '10vw',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    marginRight: '-50%',
    borderColor: '#e5e7eb',
    borderRadius: '0.75em',
    padding: '0',
  },
};

export default function Sign({ txId }) {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setIsLoading] = React.useState(false);
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

  const onSubmit = (data) => {
    setIsLoading(true)
    signDeclaration(txId, data.name, account, data.handle)
      .finally(() => {
        setIsLoading(false)
        closeModal()
        // TODO: other parts of flow idk
      })
  }

  return (<Box title="Sign the Declaration" content={
    <>
      <div className="my-6">
        <p className="font-mono">
          If you'd like to endorse this declaration, you can sign it by clicking the button below. Signatures will become part of this document's permanent history on the Arweave blockchain.
        </p>
        <Button
          primary
          onClick={openModal}>
          Sign
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="sign-modal"
      >
        <div className="w-full h-full bg-gray-50">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full font-body pb-4">
            <div className="w-full font-mono font-bold text-center py-3.5 bg-gray-100 text-brown-20 border-b border-gray-200">Sign the Declaration</div>
            <div className="pt-7 pb-4 px-8 bg-gray-50">
              <p className="font-mono text-brown-20">Enter your name to sign:</p>
              <div className="mt-6">
                <input className="font-mono rounded-t-lg border-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text" {...register("name")} autoComplete="off" placeholder="Your name or alias" />
                <input className="font-mono rounded-b-lg border-b-2 border-l-2 border-r-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text"{...register("handle")} autoComplete="off" placeholder="Your Twitter handle (optional)"/>
              </div>
              <div className="mt-2 text-center">
                <Button className="mt-5 px-6 py-2 rounded-full bg-truegray-800 hover:text-gray-100 text-white text-sm sm:text-base font-mono" primary>{loading ? <ScaleLoader color="white" height={12} width={3}/> : 'Sign with Metamask'}</Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>} />
  );
}
