import React from 'react';
import Modal from 'react-modal';
import {useForm} from "react-hook-form";
import {forkDeclaration, signDeclaration} from "../arweaveFns";

Modal.setAppElement('#__next');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '60vw',
    marginRight: '-50%',
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
        <div className="text-center pb-4">Fork the declaration</div>
        <textarea {...register("declaration")} className="max-h-96 resize-none border border-gray-200 rounded-sm px-5 py-4 w-full outline-none" rows={30}/>
        <div className="text-center">
          <button className="mt-3 px-6 py-2 rounded-lg bg-brown-20 text-white text-md">
            Fork
          </button>
        </div>
      </form>
    </Modal>
  </div>)
}
