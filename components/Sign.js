import React, { useRef } from 'react';
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

export default function Sign({ txId, declaration }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setIsLoading] = React.useState(false);
  const [displayedError, setDisplayedError] = React.useState(false);
  const [displayedSuccess, setDisplayedSuccess] = React.useState(false);
  const { status, connect, account } = useMetaMask();
  const nameRef = useRef();
  const handleRef = useRef();

  // TODO: switch on status and display appropriate error messages
  // cases:
  // - unavailable -> no metamask, disable button
  // - notConnected -> ok to sign
  // - connected -> ready to sign
  // TODO: check if user already signed using this wallet

  function openModal() {
    setIsOpen(true);
    if (status === "notConnected") {
      connect();
    }
  }

  function closeModal() {
    setIsOpen(false);
    setIsLoading(false);
    setDisplayedError(null);
    reset();
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    setDisplayedError(null);
    signDeclaration(txId, data.name, data.handle, declaration)
      .then((signatureServerResponse) => {
        console.log("Signature saved:", signatureServerResponse);
        setDisplayedSuccess("Signature saved! Refresh to see the update.");
        setIsLoading(false);
        // closeModal();
      })
      .catch((err) => {
        setDisplayedError(err.message);
        setIsLoading(false);
      });
  };

  return (<Box title="Sign the Declaration" content={
    <>
      <div className="my-6">
        <p className="font-mono mb-6">
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
            <div className="w-full font-mono font-bold text-center py-3.5 bg-gray-100 text-gray-20 border-b border-gray-200">Sign the Declaration</div>
            <div className="pt-7 pb-4 px-8 bg-gray-50">
              <p className="font-mono text-gray-20">Enter your name to sign:</p>
              <div className="mt-6">
                <input className="font-mono rounded-t-lg border-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text" {...register("name")} autoComplete="off" autoFocus placeholder="Your name or alias" />
                <input className="font-mono rounded-b-lg border-b-2 border-l-2 border-r-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text"{...register("handle")} autoComplete="off" placeholder="Your Twitter handle (optional)"/>
              </div>
              <div className="mt-2 text-center">
                <Button className={"mt-5 px-6 py-2 rounded-full bg-truegray-800 hover:text-gray-100 text-white text-sm sm:text-base font-mono" + (window.ethereum ? "" : " opacity-60")} primary>{loading ? <ScaleLoader color="white" height={12} width={3}/> : 'Sign with Metamask'}</Button>
              </div>
              {(displayedError || !window.ethereum) && <div className="mt-7 text-center font-mono text-sm text-red-700">{displayedError || <>No wallet found. Please install <a className="underline" target="_blank" href="https://metamask.io/download.html">Metamask</a> or another Web3 wallet provider.</>}</div>}
              {displayedSuccess && <div className="mt-7 text-center font-mono text-sm text-green-700">{displayedSuccess}</div>}
            </div>
          </form>
        </div>
      </Modal>
    </>} />
  );
}
