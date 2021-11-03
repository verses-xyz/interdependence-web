
import Modal from 'react-modal';

Modal.setAppElement('#__next');
Modal.defaultStyles.overlay.backgroundColor = '#000000aa';

const customStyles = {
  content: {
    top: '10vh',
    left: '10vw',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    paddingBottom: '1.5rem',
    marginRight: '-50%',
    borderRadius: '0.75em',
    borderColor: 'transparent',
    padding: '0',
    webkitFontSmoothing: 'subpixel-antialiased',
  },
};


export default function Modal({children, ...props}) {
  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="fork-editor"
      >
      <div className="w-full h-full font-body bg-gray-bg border-none"></div>
        <button primary className="ml-2.5 mt-5 px-6 py-2 rounded-full text-gray-wash hover:text-gray-20 text-sm sm:text-md font-mono" {...props}>
          {children}
        </button>;
    </Modal>
)}
