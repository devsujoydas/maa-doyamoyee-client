// src/components/modals/GalleryFormModal.jsx
import React, { useState, useEffect, useRef } from "react";
import Modal from "../ui/Modal";
import { FaTimes, FaUpload } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

import { useCreateGallery, useUpdateGallery } from "../../hooks/useGallery";

const GalleryFormModal = ({ isOpen, onClose, editData }) => {
  const fileInputRef = useRef();
  const [form, setForm] = useState({ title: "", description: "", category: "event" });
  const [images, setImages] = useState([]); // new images
  const [previewUrls, setPreviewUrls] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // publicIds of removed images

  const { mutate: createGallery } = useCreateGallery();
  const { mutate: updateGallery } = useUpdateGallery();

  // Sync edit data
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        category: editData.category || "event",
      });
      setPreviewUrls(
        editData.images?.map((img) => ({ url: img.imageUrl, publicId: img.publicId })) || []
      );
      setDeletedImages([]);
      setImages([]);
    } else {
      setForm({ title: "", description: "", category: "event" });
      setPreviewUrls([]);
      setImages([]);
      setDeletedImages([]);
    }
  }, [editData, isOpen]);

  // Compress image
  const compressImage = async (file) => {
    try {
      return await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true });
    } catch {
      return file;
    }
  };

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB allowed");
      return false;
    }
    return true;
  };

  const handleFile = async (file) => {
    if (!file || !validateFile(file)) return;
    const compressed = await compressImage(file);
    setImages((prev) => [...prev, compressed]);
    setPreviewUrls((prev) => [...prev, { url: URL.createObjectURL(compressed) }]);
  };

  const handleFileSelect = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleRemoveImage = (index) => {
    if (editData && previewUrls[index].publicId) {
      setDeletedImages((prev) => [...prev, previewUrls[index].publicId]);
    }
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!images.length && (!editData || previewUrls.length === 0)) {
      toast.error("At least one image required");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    images.forEach((img) => formData.append("images", img));
    formData.append("deletedImages", JSON.stringify(deletedImages));

    if (editData) {
      updateGallery({ id: editData._id, formData }, { onSuccess: () => onClose() });
    } else {
      createGallery(formData, { onSuccess: () => onClose() });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-lg">
      <div className="p-2">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{editData ? "Update Gallery" : "Add Gallery"}</h2>
          <FaTimes onClick={onClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Drag & Drop */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center cursor-pointer hover:border-gray-400 transition relative overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            {previewUrls.length ? (
              <div className="flex flex-wrap gap-2 p-2 overflow-y-auto">
                {previewUrls.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
                    <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(i);
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <FaUpload className="text-3xl mx-auto mb-2" />
                <p>Drag & Drop or Click</p>
              </div>
            )}
            <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} />
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input-field"
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Description"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="event">Event</option>
            <option value="puja">Puja</option>
            <option value="festival">Festival</option>
            <option value="daily">Daily</option>
            <option value="temple">Temple</option>
          </select>

          <button className="btn-primary w-full">{editData ? "Update" : "Create"}</button>
        </form>
      </div>
    </Modal>
  );
};

export default GalleryFormModal;