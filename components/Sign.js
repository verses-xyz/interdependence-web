import React from 'react';
import { useForm } from 'react-hook-form';
import { signDeclaration } from "../arweaveFns";
import Modal from "react-modal";
import Button from "./core/Button";

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
          <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full font-body bg-gray-50">             
          <div className="font-mono font-bold text-center py-3.5 bg-gray-100 text-gray-800 border-b border-gray-200">Sign the Declaration</div>
            <div className="pt-4 pb-2.5 px-5 bg-gray-50">
              <p className="font-mono text-center text-xl p-4">
                <p className="pt-10"> Follow these steps to sign the declaration on-chain. </p>
                ---
                <p className="pt-10">
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
                </p>
            
              <div className=""> 
                <input className="focus:outline-none w-full border-b-2 px-4 py-4" type="text" {...register("name")} placeholder="Name / Alias" />
                <input className="focus:outline-none w-full border-b-2 px-4 py-4" type="text"{...register("handle")} placeholder="Twitter Handle"/>
              </div>

              <div className="mt-4 text-center"> 
               <Button className="mb-5 px-8 py-4 rounded-full bg-brown-20 text-white font-mono rounded-full"> Submit </Button>
              </div>
            
            </div>
            
            </form>
          </div>
      </Modal>
    </div>
  )

}
