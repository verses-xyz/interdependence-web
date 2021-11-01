import React from 'react';
import Modal from 'react-modal';
import {useForm} from "react-hook-form";
import {forkDeclaration, signDeclaration} from "../arweaveFns";

Modal.setAppElement('#__next');
Modal.defaultStyles.overlay.backgroundColor = '#555555aa';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    marginRight: '-50%',
    borderColor: '#e5e7eb',
    borderRadius: '0.75em',
    padding: '0',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Fork({text, txId, walletKey}) {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      declaration: text,
    }
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data) =>
    forkDeclaration(txId, data.declaration, [], walletKey)
      .then(data => window.location.href = `/declaration/${data.id}`);

  return (<div>
    <button
      className="mt-3 px-6 py-2 rounded-lg bg-brown-20 text-white text-md"
      onClick={openModal}>
      Fork This
    </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="fork-editor"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="text-center py-3.5 bg-gray-100 text-gray-800 border-b border-gray-200">Fork the declaration</div>
        <div className="pt-4 pb-3 px-5 bg-gray-50">
          <textarea {...register("declaration")} className="max-h-96 resize-none border border-gray-200 rounded-sm px-5 py-4 w-full outline-none" rows={30}/>
        </div>
        <div className="flex px-6 bg-gray-50">
          <div className="flex-1 text-sm mt-2.5 text-gray-800">
            To commit your fork, first
            {" "}
            <a href="https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap" target="_blank">install</a>
            {" "}
            the plugin and
            {" "}
            <a href="https://faucet.arweave.net/" target="_blank">secure some $AR</a>
          </div>
          <div className="flex-0">
            <button className="mb-5 px-6 py-2 rounded-lg bg-brown-20 text-white text-md rounded-full">
              Fork
            </button>
          </div>
        </div>
      </form>
    </Modal>
  </div>)
}
