import React from 'react';
import { useForm } from 'react-hook-form';
import { signDeclaration } from "../arweaveFns";
import Modal from "react-modal";
import Button from "./core/Button";
import Box from "./core/Box";

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
    webkitFontSmoothing: 'subpixel-antialiased',
  },
};

export default function Sign({ txId, walletKey }) {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data) =>
    signDeclaration(txId, data.name, data.handle, walletKey)
      .then(data => console.log(data.data));

  return (<Box title="Sign the Declaration" content={
    <>
      <div className="my-6">
        <p className="font-mono">
          If you'd like to endorse this declaration, you can sign the declaration by clicking the button below. Signatures will become part of this document's permanent history on the Arweave blockchain.
        </p>
        <p className="text-gray-400 font-mono mt-2"> * Coming soon * </p>
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
                <input className="font-mono rounded-t-lg border-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text" {...register("name")} autocomplete="off" placeholder="Your name or alias" />
                <input className="font-mono rounded-b-lg border-b-2 border-l-2 border-r-2 border-gray-200 focus:outline-none w-full px-4 py-4" type="text"{...register("handle")} autocomplete="off" placeholder="Your Twitter handle (optional)"/>
              </div>
              <div className="mt-2 text-center">
                <Button primary>Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>} />
  );
}
