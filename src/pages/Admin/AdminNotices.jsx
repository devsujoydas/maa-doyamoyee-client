import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import NoticeFormModal from "../../components/modals/NoticeFormModal";
import NoticeViewModal from "../../components/modals/NoticeViewModal";
import DeleteModal from "../../components/modals/DeleteModal";
import PreviewModal from "../NoticePage/PreviewModal";

import useNotices from "../../hooks/useNotices";

const AdminNotices = () => {
  const { notices, createOrUpdate, deleteNotice } = useNotices();

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [previewNotice, setPreviewNotice] = useState(null); // separate preview modal state

  // Open modals
  const openViewModal = (notice) => {
    setSelectedNotice(notice);
    setViewModalOpen(true);
  };

  const openDeleteModal = (notice) => {
    setSelectedNotice(notice);
    setDeleteModalOpen(true);
  };

  const openFormModal = (notice = null) => {
    setSelectedNotice(notice);
    setFormModalOpen(true);
  };

  // Delete notice
  const confirmDelete = async (id) => {
    try {
      await deleteNotice(id);
      toast.success("Notice deleted successfully");
      setDeleteModalOpen(false);
      setSelectedNotice(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed");
    }
  };

  // Create / Update notice
  const handleFormSubmit = async (data) => {
    try {
      const res = await createOrUpdate.mutateAsync({
        id: selectedNotice?._id,
        data,
      });
      toast.success(selectedNotice ? "Notice updated" : "Notice created");
      setFormModalOpen(false);
      setSelectedNotice(null);
    } catch (err) {
      console.error("Notice mutation error:", err?.response || err);
      toast.error("Operation failed");
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full lang-bn-BD">
      <SEOHead
        title="Notice Management"
        description="Manage notices."
        path="/admin/notices"
      />

      <div className="flex justify-between items-center">
        <h1>
          <span className="text-lg md:text-2xl font-bold">
            Notices Management
          </span>
          <span className="ml-2 border px-2 rounded-full">
            {notices.length}
          </span>
        </h1>

        <button className="btn-primary" onClick={() => openFormModal()}>
          <Plus size={16} /> Add Notice
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center ">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-sm">
            {notices.map((n) => (
              <tr key={n._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{n.title}</td>
                <td className="px-6 py-4 text-gray-900">
                  {n.eventDate?.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-gray-900">{n.eventTime}</td>
                <td className="px-6 py-4 text-gray-900">
                   <span
                    className={`px-2 py-0.5 rounded-full ${n.status === "inactive" ? "text-yellow-800 bg-yellow-100" :  "text-green-800 bg-green-100"}`}
                  >
                    {n.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center flex justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => openViewModal(n)}
                  >
                    <Eye size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                    onClick={() => openFormModal(n)}
                  >
                    <Edit2 size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => openDeleteModal(n)}
                  >
                    <HiTrash size={18} />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <NoticeFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        initialData={selectedNotice}
        onSubmit={handleFormSubmit}
      />

      <NoticeViewModal
        selectedNotice={selectedNotice}
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        onPreview={(notice) => {
          setViewModalOpen(false); // close card modal
          setPreviewNotice(notice); // open preview modal
        }}
      />

      <PreviewModal
        selected={previewNotice}
        onClose={() => setPreviewNotice(null)}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        confirmDelete={() => confirmDelete(selectedNotice?._id)}
        selected={selectedNotice}
      />
    </div>
  );
};

export default AdminNotices;
