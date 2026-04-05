// AdminUsers.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye, UserCheck, User } from "lucide-react";
import toast from "react-hot-toast";
import UserViewModal from "../../components/modals/UserViewModal";
import DeleteModal from "../../components/modals/DeleteModal"; 
import { MdVerified } from "react-icons/md";
import { useData } from "../../context/useData";

const AdminUsers = () => {
  const { users, refetchUsers } = useData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Open view modal
  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  // Open delete modal
  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    const updatedUsers = users?.filter((u) => u._id !== selectedUser._id);

    // Update React Query cache manually
    refetchUsers({ queryKey: ["users"], queryFn: () => updatedUsers });

    toast.success("User deleted successfully");
    setDeleteModalOpen(false);
    setViewModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">
          Users Management{" "}
          <span className="border rounded-full px-2 py-0.5 text-sm md:text-lg font-semibold">
            {users.length}
          </span>
        </h1>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user?._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full object-cover overflow-hidden object-center">
                    <img
                      loading="lazy"
                      className=" rounded-full object-center "
                      src={user?.profileImage}
                      alt={user?.name}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 text-nowrap flex justify-start items-center gap-1">
                      {user?.name}
                      {user?.isVerified && (
                        <MdVerified
                          size={14}
                          className="text-blue-500"
                          title="Verified"
                        />
                      )}
                    </div>
                    <div className="text-sm text-gray-500 -mt-1">
                      @{user?.username}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3 text-sm text-gray-500">
                  {user?.email}
                </td>

                <td className="px-6 py-3 text-sm">
                  {user?.role === "admin" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <UserCheck className="mr-1 w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <User className="mr-1 w-3 h-3" /> User
                    </span>
                  )}
                </td>

                <td className="px-6 py-3 text-sm text-gray-500">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-3 text-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleView(user)}
                  >
                    <Eye size={18} />
                  </motion.button>

                  {user.role !== "admin" && (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-red-600 hover:text-red-800  cursor-pointer"
                      onClick={() => handleDelete(user)}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modals */}
      {selectedUser && (
        <UserViewModal
          isOpen={viewModalOpen}
          setOpen={setViewModalOpen}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          confirmDelete={confirmDelete}
          selected={selectedUser}
          isUser={selectedUser}
        />
      )}
    </div>
  );
};

export default AdminUsers;
