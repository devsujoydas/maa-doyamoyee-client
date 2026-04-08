import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import ImageUpload from "../resuable/ImageUpload";
import useBlogs from "../../hooks/useBlogs";

const BlogFormModal = ({ isOpen, onClose, initialData }) => {
  const { createOrUpdate } = useBlogs();

  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [postImg, setPostImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Events","Teachings","Updates","Community","Cultural","Announcements"];

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreviewUrl(initialData.postImg?.url || null);
    } else {
      setForm({ title: "", content: "", category: "" });
      setPreviewUrl(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.category)
      return toast.error("All fields required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      if (postImg) formData.append("image", postImg);

      await createOrUpdate.mutateAsync({ id: initialData?._id, formData });
      toast.success("Success");
      onClose();
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal wClass="max-w-xl" isOpen={isOpen} onClose={onClose}>
      <div className="p-4 relative bg-white rounded-xl">
        <button onClick={onClose} className="absolute right-4 top-4"><FaTimes /></button>
        <h2 className="text-xl mb-3">{initialData ? "Edit Blog" : "Add Blog"}</h2>

        <ImageUpload
          value={postImg}
          onChange={setPostImg}
          preview={previewUrl}
          setPreview={setPreviewUrl}
        />

        <input
          className="input-field mt-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="input-field mt-2"
          rows={4}
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <select
          className="input-field mt-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select</option>
          {categories.map((c) => (<option key={c}>{c}</option>))}
        </select>

        <button onClick={handleSubmit} className="btn-primary w-full mt-3">
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </Modal>
  );
};

export default BlogFormModal;