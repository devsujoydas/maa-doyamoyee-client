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

  useEffect(() => {
    if (!isOpen) return;
    setSelectedFile(null);
    setPreviewUrl(null);
    setLoading(false);
  }, [isOpen]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  if (!isOpen) return null;

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

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) return;
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !validateFile(file)) return;
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error("Please select an image");
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
      onUpload(
        type === "profile" ? updatedUser.profileImage : updatedUser.coverImage,
      );
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
      <div className="relative">
        {/* Close */}

        <div className="flex justify-between items-start  mb-5">
          <h2 className="text-lg font-medium text-gray-800 ">{title}</h2>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>
        {/* Header */}

        {/* Drag & Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-[#4b1e2f] transition relative"
          onClick={() => fileInputRef.current.click()}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="preview"
                className="mx-auto max-h-40 rounded-lg object-contain"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
              >
                <FaTimes size={12} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#EDE9EA] flex items-center justify-center rounded-lg mb-4">
                <FaUpload className="text-2xl text-[#4b1e2f]" />
              </div>
              <p className="text-gray-600">
                Drop your image here, or{" "}
                <span className="text-[#4b1e2f] cursor-pointer font-medium">
                  browse
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supports: PNG, JPG, JPEG, WEBP
              </p>
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
          className="mt-6 w-full bg-[#4b1e2f] text-white py-3 rounded-lg hover:bg-[#6b0527] transition flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </Modal>
  );
};

export default UploadPhotoModal;
