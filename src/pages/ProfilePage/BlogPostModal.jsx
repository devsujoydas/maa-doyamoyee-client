// BlogPostModal.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion"; 

const BlogPostModal = ({ isOpen, onClose, onPost }) => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: e.target.title.value,
      category: e.target.category.value,
      tags: e.target.tags.value,
      content,
      image: imagePreview,
    };
    onPost(newPost);
    setContent("");
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="bg-white p-6 rounded-xl w-full max-w-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
      >
        <h2 className="text-xl font-semibold mb-4">Create Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Post Title"
            className="w-full border p-2 rounded"
            required
          />
          <select name="category" className="w-full border p-2 rounded" required>
            <option value="">Select Category</option>
            <option value="Temple News">Temple News</option>
            <option value="Festival">Festival</option>
            <option value="Community">Community</option>
          </select> 
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full border p-2 rounded"
          />
          <input type="file" onChange={handleImage} />
          {imagePreview && 
          <img loading="lazy" src={imagePreview} className="h-40 mt-2 rounded" />}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Publish
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BlogPostModal;