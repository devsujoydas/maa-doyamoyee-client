import { useState, useEffect } from "react";
import ImageUpload from "../../components/resuable/ImageUpload";
import Modal from "../ui/Modal";

const GalleryFormModal = ({ isOpen, onClose, onSubmit, editData, loading }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        eventDate: editData.eventDate?.slice(0, 10) || "",
      });
      setPreview(editData.img?.url);
    } else {
      setForm({ title: "", description: "", eventDate: "" });
      setPreview(null);
      setImage(null);
    }
  }, [editData]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("eventDate", form.eventDate);

    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={loading ? null : onClose} wClass="max-w-xl">
      <div className="p-4 bg-white rounded-xl">
        <h2 className="mb-4">{editData ? "Update" : "Add"} Image</h2>

        <ImageUpload
          value={image}
          onChange={setImage}
          preview={preview}
          setPreview={setPreview}
        />

        <input
          className="input-field w-full mb-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="input-field w-full mb-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          className="input-field w-full mb-4"
          value={form.eventDate}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </Modal>
  );
};

export default GalleryFormModal;