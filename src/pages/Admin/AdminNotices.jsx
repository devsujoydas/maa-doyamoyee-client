import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import useNotices from "../../hooks/useNotices";
import NoticeFormModal from "../../components/modals/NoticeFormModal";
import NoticeViewModal from "../../components/modals/NoticeViewModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { HiTrash } from "react-icons/hi";
import { Edit2, Eye, Plus } from "lucide-react";
import { 
  formatDateEnglish,
} from "../../utils/formatDateDynamic";
import PreviewModal from "../NoticePage/PreviewModal";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminNotices = () => {
  const {
    notices,
    isLoading,
    createOrUpdate,
    togglePin,
    toggleStatus,
    deleteNotice,
  } = useNotices();

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const togglePinHandler = (n) => {
    togglePin(n._id);
    toast.success("Pin updated successfully");
  };

  const toggleStatusHandler = (n) => {
    toggleStatus(n._id);
    toast.success("Status updated successfully");
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotice(id);
      toast.success("Notice deleted successfully");
      setDeleteOpen(false);
      setSelectedNotice(null);
    } catch (err) {
      toast.error(err?.message || "Failed to delete notice");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-2xl  font-bold">
          Notices Management ({notices.length})
        </h1>

        <button
          className="btn-primary"
          onClick={() => {
            setFormOpen(true);
            setSelectedNotice(null);
          }}
        >
          <Plus size={16} /> Add Notice
        </button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 text-left ">SL</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Publish Date</th>
                <th className="px-6 py-4 text-left">Event Date</th>
                <th className="px-6 py-4 text-left">Event Time</th>
                <th className="px-6 py-4 text-center">Pinned</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {notices.map((n, idx) => (
                <tr key={n._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 text-gray-900 text-nowrap">
                    {n.title}
                  </td>
                  <td className="px-6 py-4 text-gray-900 text-nowrap">
                    {formatDateEnglish(n.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-900 text-nowrap">
                    {formatDateEnglish(n.eventDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{n.eventTime}</td>

                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => togglePinHandler(n)}
                      className="text-lg cursor-pointer"
                    >
                      {n.pinned ? "📌" : "—"}
                    </button>
                  </td>

                  <td className="px-6 py-3 text-center text-xs">
                    <button
                      onClick={() => toggleStatusHandler(n)}
                      className={`px-2 py-1 rounded ${
                        n.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      } cursor-pointer`}
                    >
                      {n.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-center flex justify-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        setSelectedNotice(n);
                        setViewOpen(true);
                      }}
                    >
                      <Eye size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      onClick={() => {
                        setSelectedNotice(n);
                        setFormOpen(true);
                      }}
                    >
                      <Edit2 size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => {
                        setSelectedNotice(n);
                        setDeleteOpen(true);
                      }}
                    >
                      <HiTrash size={18} />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Add / Edit Modal */}
      <NoticeFormModal
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedNotice(null);
        }}
        initialData={selectedNotice}
        onSubmit={(data) => {
          createOrUpdate.mutate({ id: selectedNotice?._id, formData: data });
          if (!selectedNotice?._id) {
            toast.success("Notice created successfully");
          }
          if (selectedNotice?._id) {
            toast.success("Notice updated successfully");
          }
          setFormOpen(false);
          setSelectedNotice(null);
        }}
      />

      {/* View Modal */}
      <NoticeViewModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        notice={selectedNotice}
        onPreview={(n) => {
          setSelectedNotice(n);
          setPreviewOpen(true);
        }}
      />

      {/* Preview Modal */}
      {selectedNotice && (
        <PreviewModal
          selected={selectedNotice}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        confirmDelete={handleDelete}
        selected={selectedNotice}
      />
    </div>
  );
};

export default AdminNotices;
