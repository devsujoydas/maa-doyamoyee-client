import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const defaultForm = {
  title: "",
  description: "",
  category: "general",
  status: "active",
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
    if (!form.title || !form.description) return toast.error("Title & Description required");
    onSubmit({ ...form, eventDate: form.eventDate || null });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-4xl">
      <div className="flex flex-col max-h-[80vh]">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-center">{initialData ? "Edit Notice" : "Add Notice"}</h2>
        </div>
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} />
          <Input label="PDF URL" name="pdfUrl" value={form.pdfUrl} onChange={handleChange} />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
          <Input label="Event Date" type="date" name="eventDate" value={form.eventDate} onChange={handleChange} />
          <Input label="Event Time" type="time" name="eventTime" value={form.eventTime} onChange={handleChange} />
          <Input label="Venue" name="venue" value={form.venue} onChange={handleChange} />
          <Input label="Issued By" name="issuedBy" value={form.issuedBy} onChange={handleChange} />
          <Select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={[
              { label: "General", value: "general" },
              { label: "Event", value: "event" },
              { label: "Meeting", value: "meeting" },
              { label: "Announcement", value: "announcement" },
              { label: "Donation", value: "donation" },
              { label: "Puja", value: "puja" },
            ]}
          />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>
        <div className="p-4 border-t bg-white">
          <button onClick={handleSubmit} className="btn-primary w-full">{initialData ? "Update" : "Create"}</button>
        </div>
      </div>
    </Modal>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="text-xs font-medium">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="input-field mt-1" />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div className="sm:col-span-2">
    <label className="text-xs font-medium">{label}</label>
    <textarea name={name} value={value} onChange={onChange} className="input-field mt-1" rows={4} />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-xs font-medium">{label}</label>
    <select name={name} value={value} onChange={onChange} className="input-field mt-1">
      {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export default NoticeFormModal;