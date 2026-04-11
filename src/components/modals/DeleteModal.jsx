import { useState } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, confirmDelete, selected, isUser }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !selected) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await confirmDelete(selected._id);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-sm">
      <div className="bg-white rounded-xl p-4 relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 disabled:opacity-50"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Confirm Delete
        </h2>

        <p className="mb-4 text-center text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium">
            {isUser ? selected.name : selected.title}
          </span>
          ?
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 text-white rounded cursor-pointer ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;