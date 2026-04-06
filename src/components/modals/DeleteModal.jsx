import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, confirmDelete, selected }) => {
  if (!isOpen || !selected) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-sm">
      <div className="bg-white rounded-xl p-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FaTimes size={18} /></button>
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
        <p className="mb-4 text-center text-gray-600">Are you sure you want to delete <span className="font-medium">{selected.title}</span>?</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => confirmDelete(selected._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;