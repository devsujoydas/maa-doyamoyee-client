import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const NoticeFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "general",
    status: "active",
    eventDate: "",
    eventTime: "",
    issuedBy: "",
    venue: "",
    pdfUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        eventDate: initialData.eventDate?.slice(0, 10) || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "general",
        status: "active",
        eventDate: "",
        eventTime: "",
        issuedBy: "",
        venue: "",
        pdfUrl: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title || !form.description)
      return toast.error("Title & Description required");
    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-4xl w-full lang-bn-BD">
      <div className="flex flex-col max-h-[80vh] sm:max-h-[90vh]">
        <div className="p-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-center">
            {initialData ? "Edit Notice" : "Add Notice"}
          </h2>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                PDF URL
              </label>
              <input
                name="pdfUrl"
                value={form.pdfUrl}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Event Time
              </label>
              <input
                type="time"
                name="eventTime"
                value={form.eventTime}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Venue
              </label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Issued By
              </label>
              <input
                name="issuedBy"
                value={form.issuedBy}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              >
                <option value="general">General</option>
                <option value="event">Event</option>
                <option value="meeting">Meeting</option>
                <option value="announcement">Announcement</option>
                <option value="donation">Donation</option>
                <option value="puja">Puja</option>
              </select>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field mt-1 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-200 bg-white">
          <button
            onClick={handleSubmit}
            className="btn-primary w-full text-sm sm:text-base"
          >
            {initialData ? "Update Notice" : "Create Notice"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoticeFormModal;