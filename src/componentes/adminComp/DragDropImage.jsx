import React, { useRef } from "react";

const DragDropImage = ({ onFile, preview }) => {
  const inputRef = useRef();
  const handleDrop = e => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = e => {
    if (e.target.files && e.target.files[0]) {
      onFile(e.target.files[0]);
    }
  };
  return (
    <div
      className="border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onClick={() => inputRef.current.click()}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {preview ? (
        <img src={preview} alt="preview" className="mx-auto h-24 object-contain" />
      ) : (
        <span>Arrastra una imagen aquí o haz click para seleccionar</span>
      )}
    </div>
  );
};

export default DragDropImage;
