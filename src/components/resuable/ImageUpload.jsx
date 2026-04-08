import { useRef, useEffect, useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const ImageUpload = ({ value, onChange, preview, setPreview, label }) => {
  const fileInputRef = useRef();

  useEffect(() => {
    if (!value) return;

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    // Cleanup previous blob URL on unmount or change
    return () => URL.revokeObjectURL(objectUrl);
  }, [value, setPreview]);

  const compressImage = async (file) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
    } catch {
      return file;
    }
  };

  const handleFile = async (file) => {
    if (!file?.type.startsWith("image/")) return toast.error("Only image allowed");

    const compressed = await compressImage(file);
    onChange(compressed);
  };

  return (
    <div
      className="border-2 border-dashed rounded-xl h-40 flex items-center justify-center cursor-pointer mb-4 relative"
      onClick={() => fileInputRef.current.click()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {preview ? (
        <>
          <img src={preview} className="w-full h-full object-contain" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              setPreview(null);
            }}
            className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
          >
            <FaTimes size={12} />
          </button>
        </>
      ) : (
        <div className="text-center text-gray-400">
          <FaUpload className="mx-auto mb-2" />
          {label || "Upload Image"}
        </div>
      )}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default ImageUpload;