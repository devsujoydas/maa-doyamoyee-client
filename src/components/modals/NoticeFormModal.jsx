import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import axios from "axios";

const NoticeFormModal = ({ isOpen, onClose, initialData = null, onUpdated }) => {
  const categories = ["meeting", "event", "announcement", "general", "donation"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pdfUrl: "",
    isPinned: false,
    status: "active",
    eventDate: "",
    eventTime: "",
    issuedBy: "",
    venue: "",
  });

  const to24HourFormat = (time12h) => {
  if (!time12h) return "";
  const [time, modifier] = time12h.split(" ");
  if (!modifier) return time; // already in 24h
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12;
  if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

  // Populate form on edit
 useEffect(() => {
  if (initialData) {
    setFormData({
      ...initialData,
      eventDate: initialData.eventDate
        ? new Date(initialData.eventDate).toISOString().split("T")[0]
        : "",
      eventTime: to24HourFormat(initialData.eventTime),
    });
  } else {
    setFormData({
      title: "",
      description: "",
      category: "",
      pdfUrl: "",
      isPinned: false,
      status: "active",
      eventDate: "",
      eventTime: "",
      issuedBy: "",
      venue: "",
    });
  }
}, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.pdfUrl) {
      toast.error("Title, Description, and PDF URL are required");
      return;
    }

    try {
      if (initialData?._id) {
        // Update notice
        const { data } = await axios.put(
          `http://localhost:5000/api/v1/notices/${initialData._id}`,
          formData
        );
        toast.success("Notice updated successfully");
        onUpdated(data);
      } else {
        // Create new notice
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/notices",
          formData
        );
        toast.success("Notice added successfully");
        onUpdated(data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-3xl">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {initialData ? "Update Notice" : "Add Notice"}
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
              placeholder="Enter title"
              className="input-field"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* PDF URL */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">PDF URL *</label>
            <input
              type="text"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              placeholder="Link to PDF"
              className="input-field"
              required
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Event Time */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Event Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Issued By */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Issued By</label>
            <input
              type="text"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
              placeholder="Issuer's name"
              className="input-field"
            />
          </div>

          {/* Venue */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Event venue"
              className="input-field"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter notice details"
              className="input-field resize-none"
              rows={4}
              required
            />
          </div>

          {/* Pinned & Status */}
          <div className="flex items-center gap-4 md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPinned"
                checked={formData.isPinned}
                onChange={handleChange}
                className="h-4 w-4 accent-[#CF4517]"
              />
              <span className="font-medium text-gray-700">Pinned</span>
            </label>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#CF4517] hover:bg-[#e24e1c] text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              {initialData ? "Update Notice" : "Add Notice"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NoticeFormModal;