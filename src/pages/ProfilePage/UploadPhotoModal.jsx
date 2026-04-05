import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider/authProvider";
import imageCompression from "browser-image-compression";

const UploadPhotoModal = ({ isOpen, onClose, onUpload, type }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();
  const { setUser } = useAuth();

  const title =
    type === "profile" ? "Upload Profile Photo" : "Upload Cover Photo";

  // ✅ reset + preview safe
  useEffect(() => {
    if (!isOpen) return;

    setSelectedFile(null);
    setPreviewUrl(null);
    setLoading(false);
  }, [isOpen]);

  // ✅ preview তৈরি (memory safe)
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  if (!isOpen) return null;

  // ✅ validate file
  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB allowed");
      return false;
    }

    return true;
  };

  // ✅ compress image
  const compressImage = async (file) => {
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      return compressed;
    } catch (err) {
      console.error(err);
      return file;
    }
  };

  // ✅ file select
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) return;

    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  // ✅ drag & drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !validateFile(file)) return;

    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  const handleDragOver = (e) => e.preventDefault();

  // ✅ remove image
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // ✅ upload
  const handleUpload = async () => {
    if (!selectedFile) {
      return toast.error("Please select an image");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      const route =
        type === "profile" ? "/users/profile-photo" : "/users/cover-photo";

      const res = await api.put(route, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data.user;
      setUser(updatedUser);
      toast.success(res.data.message);

      const field = type === "profile" ? "profileImage" : "coverImage";
      onUpload(updatedUser[field]);

      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-md">
      <div className=" rounded-2xl p-3 relative ">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {title}
        </h2>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition bg-gray-50 overflow-hidden relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="preview"
                className="h-full w-full object-contain p-2 rounded-xl"
              />

              {/* ❌ remove button */}
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
              >
                <FaTimes size={12} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FaUpload className="text-4xl mb-3 text-orange-400" />
              <span className="text-gray-500 font-medium text-sm text-center">
                Drag & Drop an image here <br /> or click to select
              </span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-pulse">Uploading...</span>
          ) : (
            <>
              <FaUpload /> Upload
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default UploadPhotoModal;