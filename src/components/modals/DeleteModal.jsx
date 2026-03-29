import Modal from "../ui/Modal";

const DeleteModal = ({
  deleteModalOpen,
  setDeleteModalOpen,
  confirmDelete,
  selected,
  isUser,
}) => { 
  return (
    <Modal
      wClass={"max-w-md"}
      isOpen={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
    >
      {selected && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
          {isUser ? (
            <p>
              Are you sure you want to delete <strong>{selected.name}</strong>?
            </p>
          ) : (
            <p>
              Are you sure you want to delete{" "}
              <strong className="lang-bn-BD">{selected.title}</strong>?
            </p>
          )}
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteModal;
