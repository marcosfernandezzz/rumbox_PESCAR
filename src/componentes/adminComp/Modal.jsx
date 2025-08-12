import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
  <div className="absolute inset-0 backdrop-blur-sm" />
      <div
        className="bg-white rounded-lg shadow-lg p-6 min-w-[350px] w-full max-w-md relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
