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
    <button onClick={openModal}>Fork This</button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea {...register("declaration")} className="w-full" rows={30}/>
        <button>Fork</button>
      </form>
    </Modal>
  </div>)
}