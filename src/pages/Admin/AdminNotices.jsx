import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import useNotices from "../../hooks/useNotices";
import NoticeFormModal from "../../components/modals/NoticeFormModal";
import PreviewNoticeModal from "../../components/modals/PreviewNoticeModal";
import DeleteModal from "../../components/modals/DeleteModal";

const AdminNotices = () => {
  const { notices, createOrUpdate, deleteNotice } = useNotices();

  // ✅ Separate states
  const [previewNotice, setPreviewNotice] = useState(null);
  const [editNotice, setEditNotice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Open form
  const openForm = (notice = null) => {
    setEditNotice(notice);
    setFormOpen(true);
  };

  // Submit
  const handleSubmit = async (formData) => {
    try {
      await createOrUpdate.mutateAsync({
        id: editNotice?._id,
        formData,
      });

      toast.success(editNotice ? "Notice updated" : "Notice created");

      setFormOpen(false);
      setEditNotice(null);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await deleteNotice(deleteTarget._id);

      toast.success("Notice deleted");

      setDeleteOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">
          Notices{" "}
          <span className="ml-2 border px-2 rounded-full">
            {notices.length}
          </span>
        </h1>

        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => openForm()}
        >
          <Plus size={16} /> Add Notice
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">SL</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {notices.map((n, idx) => (
              <tr key={n._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                <td className="px-6 py-4">{n.title}</td>
                <td className="px-6 py-4">{n.eventDate?.slice(0, 10)}</td>
                <td className="px-6 py-4">{n.eventTime}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      n.status === "inactive"
                        ? "text-yellow-800 bg-yellow-100"
                        : "text-green-800 bg-green-100"
                    }`}
                  >
                    {n.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex justify-center space-x-3">
                  {/* Preview */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setPreviewNotice(n)}
                  >
                    <Eye size={18} className="text-blue-600" />
                  </motion.button>

                  {/* Edit */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => openForm(n)}
                  >
                    <Edit2 size={18} className="text-yellow-600" />
                  </motion.button>

                  {/* Delete */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      setDeleteTarget(n);
                      setDeleteOpen(true);
                    }}
                  >
                    <HiTrash size={18} className="text-red-600" />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modals */}

      {/* Form Modal */}
      <NoticeFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditNotice(null);
        }}
        initialData={editNotice}
        onSubmit={handleSubmit}
      />

      {/* Preview Modal */}
      <PreviewNoticeModal
        notice={previewNotice}
        onClose={() => setPreviewNotice(null)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteTarget(null);
        }}
        confirmDelete={handleDelete}
        selected={deleteTarget}
      />
    </div>
  );
};

export default AdminNotices;