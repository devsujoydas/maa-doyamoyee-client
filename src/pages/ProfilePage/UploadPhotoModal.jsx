import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import toast from "react-hot-toast";
import api from "../../utils/api"; // axios instance
import { useAuth } from "../../AuthProvider/authProvider";

const UploadPhotoModal = ({ isOpen, onClose, onUpload, type }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const { setUser } = useAuth();

  // Reset state whenever modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null); // Reset file preview
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const title =
    type === "profile" ? "Upload Profile Photo" : "Upload Cover Photo";

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
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

      const updatedUser = res.data;
      setUser(updatedUser);

      const field = type === "profile" ? "profileImage" : "coverImage";
      onUpload(updatedUser[field]);

      toast.success("Image uploaded successfully!");
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
      <div className="bg-white rounded-2xl p-6 relative shadow-lg">
        {/* Close Button */}
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

        {/* Drag & Drop Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors bg-gray-50 overflow-hidden relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="h-full w-full object-contain rounded-xl p-2"
            />
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
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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