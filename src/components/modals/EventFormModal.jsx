import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import ImageUpload from "../resuable/ImageUpload";
import useEvents from "../../hooks/useEvents";

const EventFormModal = ({ isOpen, onClose, initialData }) => {
  const { addEvent, editEvent } = useEvents();

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    upcoming: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED SYNC
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        eventDate: initialData.eventDate?.split("T")[0] || "",
        upcoming: initialData.upcoming ?? true,
        image: null,
      });

      setPreview(initialData.image?.url || null);
    } else {
      setForm({
        title: "",
        description: "",
        eventDate: "",
        upcoming: true,
        image: null,
      });

      setPreview(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    // ✅ VALIDATION FIX
    if (!form.title || !form.description || !form.eventDate) {
      return toast.error("Title, description & date are required");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("eventDate", form.eventDate);
    formData.append("upcoming", form.upcoming);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      setLoading(true);

      if (initialData?._id) {
        await editEvent.mutateAsync({
          id: initialData._id,
          formData,
        });

        toast.success("Event updated successfully");
      } else {
        await addEvent.mutateAsync(formData);
        toast.success("Event added successfully");
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal wClass="max-w-xl" isOpen={isOpen} onClose={onClose}>
      <div className="p-4 relative bg-white rounded-xl space-y-4">
        <button onClick={onClose} className="absolute right-4 top-4">
          <FaTimes />
        </button>

        <h2 className="text-xl mb-3">
          {initialData ? "Edit Event" : "Add Event"}
        </h2>

        <ImageUpload
          value={form.image}
          onChange={handleImageChange}
          preview={preview}
          setPreview={setPreview}
          label="Upload Event Image"
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input-field"
          value={form.title}
          onChange={handleChange}
        />

        <input
          type="date"
          name="eventDate"
          className="input-field"
          value={form.eventDate}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input-field"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="btn-primary w-full">
          {loading
            ? initialData
              ? "Updating..."
              : "Adding..."
            : initialData
            ? "Update Event"
            : "Add Event"}
        </button>
      </div>
    </Modal>
  );
};

export default EventFormModal;