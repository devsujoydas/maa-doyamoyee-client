import { useEffect, useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

import NoticeFormModal from "../../components/modals/NoticeFormModal";
import NoticeViewModal from "../../components/modals/NoticeViewModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/notices");
      setNotices(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

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
  const confirmDelete = async () => {
    if (!selectedNotice) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/notices/${selectedNotice._id}`
      );
      setNotices(notices.filter((n) => n._id !== selectedNotice._id));
      toast.success("Notice deleted successfully");
      setDeleteModalOpen(false);
      setViewModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notice");
    }
  };

  // Add or update notice
  const handleFormSubmit = (noticeData) => {
    // Triggered inside NoticeFormModal
    fetchNotices(); // reload data from backend
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <SEOHead
        title="Notice Management"
        description="Manage notices."
        path="/admin/notices"
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1>
          <span className="text-lg md:text-2xl font-bold">Notices Management</span>
          <span className="border rounded-full px-2 font-semibold text-sm md:text-lg ml-2">
            {notices.length}
          </span>
        </h1>
        <button
          className="btn-primary"
          onClick={() => openFormModal(null)}
        >
          <Plus size={16} /> Add Notice
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-zinc-100 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-xs">
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Event Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Event Time</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 lang-bn-BD">
            {notices.map((notice) => (
              <tr key={notice._id} className="hover:bg-gray-50 bg-white">
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">{notice.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(notice.eventDate).toISOString().split("T")[0]}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{notice.eventTime}</td>
                <td className="px-6 py-4 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${
                    notice.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}>{notice.status}</span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center space-x-3">
                  <motion.button whileHover={{ scale: 1.2 }} className="text-blue-600" onClick={() => openViewModal(notice)}><Eye size={18} /></motion.button>
                  <motion.button whileHover={{ scale: 1.2 }} className="text-yellow-600" onClick={() => openFormModal(notice)}><Edit2 size={18} /></motion.button>
                  <motion.button whileHover={{ scale: 1.2 }} className="text-red-600" onClick={() => openDeleteModal(notice)}><HiTrash size={18} /></motion.button>
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
        onUpdated={handleFormSubmit}
      />
      <NoticeViewModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedNotice={selectedNotice}
      />
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDelete={confirmDelete}
        selected={selectedNotice}
      />
    </div>
  );
};

export default AdminNotices;