import React, { useState, useEffect } from 'react';

const ImageUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelect(file);

      // Cleanup URL on unmount
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelect(file);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer"
    >
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto h-32 object-contain" />
      ) : (
        <p>Drag & drop image here or click to select</p>
      )}
      <input type="file" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;

