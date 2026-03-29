
import Modal from "../ui/Modal";

const UserViewModal = ({
    actionModalOpen,
    setActionModalOpen,
    selectedUser,
    setDeleteModalOpen
}) => {
  return (
    <div>
      <Modal
        wClass={"max-w-md"}
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
      >
        {selectedUser && (
          <div className="space-y-4 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold">User Details</h2>

            <img loading="lazy"
              className="h-20 w-20 rounded-full object-cover"
              src={selectedUser.profileImage}
              alt={selectedUser.name}
            />
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Username:</strong> @{selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(selectedUser.joinedAt).toLocaleDateString()}
            </p>

            {selectedUser.role !== "admin" && (
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  setActionModalOpen(false);
                  setDeleteModalOpen(true);
                }}
              >
                Delete User
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserViewModal;
