import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useUsers from "../../hooks/useUsers";
import { formatDateEnglish } from "../../utils/formatDateDynamic";

import UserViewModal from "../../components/modals/UserViewModal";
import DeleteModal from "../../components/modals/DeleteModal";

import { deleteUserByAdmin, changeUserRole } from "../../services/userService";

import { useAuth } from "../../AuthProvider/authProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminUsers = () => {
  const { user: loggedInUser } = useAuth();

  const { data: users = [], isLoading } = useUsers();
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteUserByAdmin,

    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries(["users"]);
      setDeleteOpen(false);
      setSelectedUser(null);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });

  const roleMutation = useMutation({
    mutationFn: changeUserRole,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["users"]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Role update failed");
    },
  });

  // =====================
  // HANDLERS
  // =====================
  const handleRoleChange = (userId, role) => {
    roleMutation.mutate({ userId, role });
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const confirmDelete = (userId) => {
    deleteMutation.mutate(userId);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setViewOpen(true);
  };
 
  // =====================
  // RULES
  // =====================
  const canChangeRole = ["admin", "ceo"].includes(loggedInUser?.role);

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-lg md:text-2xl  font-bold">
        Users Management ({users.length})
      </h1>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="px-6 py-4 text-left">SL</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {users.map((u, idx) => {
                const isSelf = loggedInUser?._id === u._id;

                return (
                  <tr
                    key={u._id}
                    className={`hover:bg-gray-50 ${isSelf ? "bg-blue-50" : ""}`}
                  >
                    {/* SL */}
                    <td className="px-6 py-4 text-gray-500">
                      {idx + 1}
                      {isSelf && (
                        <span className="ml-2 text-xs text-blue-600">
                          (You)
                        </span>
                      )}
                    </td>

                    {/* USER */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={u?.profileImage?.url}
                        className="w-10 h-10 shadow-lg rounded-full"
                        alt=""
                      />

                      <div>
                        <p className="flex items-center gap-1 flex-nowrap text-nowrap">
                          {u.name}
                          {u.isVerified && (
                            <MdVerified className="text-blue-500" />
                          )}
                        </p>
                        <p className="text-sm text-gray-500">@{u.username}</p>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4">{u.email}</td>

                    <td className="px-6 py-4">{u.phone}</td>
                    {/* ROLE */}
                    <td className="px-6 py-4">
                      {canChangeRole && !isSelf ? (
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className="border border-zinc-200 px-2  rounded outline-none"
                          disabled={roleMutation.isLoading}
                        >
                          <option value="user">User</option>

                          {loggedInUser.role == "ceo" && (
                            <option value="ceo">CEO</option>
                          )}
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className="font-medium text-gray-700 capitalize">
                          {u.role}
                        </span>
                      )}
                    </td>

                    {/* JOINED */}
                    <td className="px-6 py-4 text-nowrap">
                      {formatDateEnglish(u.createdAt)}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleView(u)}
                        className="text-blue-600"
                      >
                        <Eye size={18} />
                      </motion.button>

                      {/* DELETE (NO SELF DELETE) */}
                      {u.role !== "admin" && u.role !== "ceo" && !isSelf && (
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          onClick={() => handleDelete(u)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* VIEW MODAL */}
      {selectedUser && (
        <UserViewModal
          isOpen={viewOpen}
          setOpen={setViewOpen}
          user={selectedUser}
        />
      )}

      {/* DELETE MODAL */}
      {selectedUser && (
        <DeleteModal
          isUser={true}
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          selected={selectedUser}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminUsers;
