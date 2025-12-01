import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-transparent z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl px-8 pb-8 pt-4  w-11/12 max-w-xl shadow-[0px_14px_28px_rgba(0,0,0,0.25),_0px_10px_10px_rgba(0,0,0,0.22)] "
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="ml-auto block text-gray-500 text-4xl rotate-45 cursor-pointer">+</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
