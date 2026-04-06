import { useState, useRef, useEffect } from "react";
import Modal from "../ui/Modal";
import { FaTimes, FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import useBlogs from "../../hooks/useBlogs";

const BlogFormModal = ({ isOpen, onClose, initialData }) => {
  const { createOrUpdate } = useBlogs();

  const [form, setForm] = useState({ title: "", content: "", category: "" });
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

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        content: initialData.content,
        category: initialData.category,
      });
      setPreviewUrl(initialData.postImg || null);
      setPostImg(null); // update mode, we won't allow new image
    } else {
      setForm({ title: "", content: "", category: "" });
      setPreviewUrl(null);
      setPostImg(null);
    }
  }, [initialData]);

  useEffect(() => {
    if (!postImg) return;
    const objectUrl = URL.createObjectURL(postImg);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [postImg]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const compressImage = async (file) => {
    try {
      return await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
    } catch {
      return file;
    }
  };

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image allowed");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB allowed");
      return false;
    }
    return true;
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) return;
    const compressed = await compressImage(file);
    setPostImg(compressed);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !validateFile(file)) return;
    const compressed = await compressImage(file);
    setPostImg(compressed);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleRemoveImage = () => {
    setPostImg(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    const { title, content, category } = form;
    if (!title || !content || !category)
      return toast.error("All fields required");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      // Only append image if creating new post
      if (!initialData && postImg) formData.append("image", postImg);

      await createOrUpdate.mutateAsync({ id: initialData?._id, formData });
      toast.success(initialData ? "Blog updated" : "Blog created");
      setForm({ title: "", content: "", category: "" });
      setPreviewUrl(null);
      onClose();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-lg">
      <div className="bg-white rounded-xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {initialData ? "Edit Blog" : "Add New Blog"}
        </h2>

        {/* Show image upload only when creating */}
        {!initialData && (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center cursor-pointer mb-4 hover:border-gray-400 transition relative overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full w-full object-contain rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                >
                  <FaTimes size={12} />
                </button>
              </>
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
        )}

        {/* Show existing image preview when updating */}
        {initialData && previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Blog Image"
              className="h-40 w-full object-cover rounded-lg"
            />
          </div>
        )}

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="input-field mt-1"
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            rows={5}
            className="input-field mt-1"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full btn-primary mt-3"
        >
          {loading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update Blog"
              : "Create Blog"}
        </button>
      </div>
    </Modal>
  );
};

export default BlogFormModal;
