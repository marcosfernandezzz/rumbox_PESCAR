import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose} // Cierra el modal si se hace clic en el fondo
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 min-w-[350px] w-full max-w-4xl relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
