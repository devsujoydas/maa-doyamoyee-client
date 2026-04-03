import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const BlogFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    slug: "",
    content: "",
    author: { name: "", email: "" },
    isApproved: "Pending",
  });

  // Prefill form if update
  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        _id: "",
        title: "",
        slug: "",
        content: "",
        author: { name: "", email: "" },
        isApproved: "Pending",
      });
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For author fields
    if (name === "authorName" || name === "authorEmail") {
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [name === "authorName" ? "name" : "email"]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author.name) {
      toast.error("Title, Content, and Author Name are required");
      return;
    }

    if (!formData._id) formData._id = Date.now().toString();

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-3xl">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {initialData ? "Update Blog" : "Add Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog title"
              className="input-field"
              required
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Custom URL slug"
              className="input-field"
            />
          </div>

          {/* Author Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Author Name *</label>
            <input
              type="text"
              name="authorName"
              value={formData.author.name}
              onChange={handleChange}
              placeholder="Author name"
              className="input-field"
              required
            />
          </div>

          {/* Author Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Author Email</label>
            <input
              type="email"
              name="authorEmail"
              value={formData.author.email}
              onChange={handleChange}
              placeholder="Author email"
              className="input-field"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium text-gray-700">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Blog content"
              className="input-field resize-none"
              rows={6}
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Status</label>
            <select
              name="isApproved"
              value={formData.isApproved}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#CF4517] hover:bg-[#e24e1c] text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              {initialData ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BlogFormModal;