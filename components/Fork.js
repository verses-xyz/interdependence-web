import React from 'react';
import Modal from 'react-modal';
import {useForm} from "react-hook-form";
import {forkDeclaration} from "../arweaveFns";
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
  },
};

export default function Fork({text, txId}) {
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
    forkDeclaration(txId, data.declaration, [])
      .then(data => window.location.href = `/declaration/${data.id}`);

  return (<div>
    <p className="md:text-justify font-mono">
      If you have a revision, addition, or challenge to this declaration, we strongly encourage you to articulate your own vision and values through a fork of this version of the declaration.
    </p>
    <Button
      onClick={openModal}>
      Fork
    </Button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="fork-editor"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full font-body bg-gray-50">
        <div className="font-mono font-bold text-center py-3.5 bg-gray-100 text-gray-800 border-b border-gray-200">Fork the declaration</div>
        <div className="pt-4 pb-2.5 px-5 bg-gray-50">
          <textarea {...register("declaration")} className="resize-none border border-gray-200 rounded-lg px-5 py-4 w-full outline-none" rows={24}/>
        </div>
        <div className="flex px-6">
          <div className="flex-1 text-sm mt-2.5 text-gray-800">
            <div>
              Like forking a software project, forking this document enables you to copy, create, and modify your own version of the original text. To commit your fork, first
              {" "}
              <a className="underline" href="https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap" target="_blank">install the plugin</a>
              {" "}
              and
              {" "}
              <a className="underline" href="https://faucet.arweave.net/" target="_blank">secure some $AR</a>
            </div>
          </div>
          <div className="flex-0">
            <Button primary className="mb-5 ml-10 px-6 py-2 rounded-full bg-brown-20 text-white font-mono rounded-full">Fork</Button>
          </div>
        </div>
      </form>
    </Modal>
  </div>);
}
