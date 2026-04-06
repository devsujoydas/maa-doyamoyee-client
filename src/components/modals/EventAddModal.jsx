import { useState } from "react";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";

const EventAddModal = ({ addModalOpen, setAddModalOpen, setEvents, events }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
    upcoming: true,
    isImportant: false,
    isPinned: false,
  });

  const handleSubmit = () => {
    const newEvent = {
      id: Date.now().toString(),
      slug: form.title.toLowerCase().replace(/\s+/g, "-"),
      ...form,
    };

 
    toast.success("Event added");
    setAddModalOpen(false);
  };

  return (
    <Modal wClass="max-w-lg" isOpen={addModalOpen} onClose={() => setAddModalOpen(false)}>
      <div className="space-y-4">

        <h2 className="text-lg font-bold">Add Event</h2>

        <input
          placeholder="Title"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Image URL"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Toggles */}
        <div className="flex gap-4 text-sm">
          <label>
            <input type="checkbox"
              onChange={(e) => setForm({ ...form, upcoming: e.target.checked })}
            /> Upcoming
          </label>

          <label>
            <input type="checkbox"
              onChange={(e) => setForm({ ...form, isImportant: e.target.checked })}
            /> Important
          </label>

          <label>
            <input type="checkbox"
              onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
            /> Pinned
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Add Event
        </button>
      </div>
    </Modal>
  );
};

export default EventAddModal;