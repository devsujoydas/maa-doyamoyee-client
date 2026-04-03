import React, { useState, useRef, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import { FaTimes, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../utils/api";

const BlogFormModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const categories = [
    "Events",
    "Teachings",
    "Updates",
    "Community",
    "Cultural",
    "Announcements",
  ];

  // Preview image
  useEffect(() => {
    if (!postImg) return setPreviewUrl(null);
    const objectUrl = URL.createObjectURL(postImg);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [postImg]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setPostImg(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setPostImg(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async () => {
    if (!title || !content || !category) return toast.error("All fields required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      if (postImg) formData.append("image", postImg);

      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAdd(res.data); // res.data is the post object directly
      toast.success("Blog created!");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Blog creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setPostImg(null);
    setPreviewUrl(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} wClass="max-w-lg">
      <div className="bg-white rounded-xl p-5 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Blog</h2>

        {/* Image Upload */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center cursor-pointer mb-4 hover:border-gray-400 transition relative overflow-hidden"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="h-full w-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FaUpload className="text-3xl mb-2" />
              <span>Drag & Drop or Click to select image</span>
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

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border border-zinc-300 rounded-full outline-none px-4 py-2.5 mb-3"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border border-zinc-300 rounded-lg outline-none px-4 py-2.5 mb-3"
          rows={5}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-zinc-300 rounded-full outline-none px-4 py-2.5 mb-4"
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </div>
    </Modal>
  );
};

export default BlogFormModal;