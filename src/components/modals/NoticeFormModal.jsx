import { useState, useEffect } from "react";
 
import toast from "react-hot-toast";
import Modal from "../ui/Modal";

const defaultForm = {
  title: "",
  description: "",
  category: "general",
  eventDate: "",
  eventTime: "",
  issuedBy: "",
  venue: "",
  pdfUrl: "",
};

const NoticeFormModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(
      initialData
        ? { ...defaultForm, ...initialData, eventDate: initialData.eventDate?.slice(0, 10) || "" }
        : defaultForm
    );
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      return toast.error("Title & Description are required");
    }
    onSubmit({ ...form, eventDate: form.eventDate || null });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-4xl">
      <div className="flex flex-col max-h-[80vh]">
        <div className="md:p-4 pb-3 border-b border-zinc-200 bg-white">
          <h2 className="text-xl font-semibold text-center">
            {initialData ? "Edit Notice" : "Add Notice"}
          </h2>
        </div>

        <div className="md:p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} />
          <Input label="PDF URL" name="pdfUrl" value={form.pdfUrl} onChange={handleChange} />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />

          <Input type="date" label="Event Date" name="eventDate" value={form.eventDate} onChange={handleChange} />
          <Input type="time" label="Event Time" name="eventTime" value={form.eventTime} onChange={handleChange} />

          <Input label="Venue" name="venue" value={form.venue} onChange={handleChange} />
          <Input label="Issued By" name="issuedBy" value={form.issuedBy} onChange={handleChange} />

          
        </div>

        <div className="md:p-4 md:py-0 py-3 border-t border-zinc-200">
          <button onClick={handleSubmit} className="btn-primary w-full">
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input {...props} className="input-field mt-1" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="sm:col-span-2">
    <label className="text-sm font-medium">{label}</label>
    <textarea {...props} className="input-field mt-1" rows={4} />
  </div>
);

export default NoticeFormModal;