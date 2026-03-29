import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import NoticeViewModal from "../../components/modals/NoticeViewModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { useData } from "../../context/DataContext";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const AdminNotices = () => {
  const { notices, setNotices } = useData();
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openViewModal = (notice) => {
    setSelectedNotice(notice);
    setViewModalOpen(true);
  };

  const openDeleteModal = (notice) => {
    setSelectedNotice(notice);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setNotices(notices.filter((n) => n.id !== selectedNotice.id));
    toast.success("Notice deleted successfully");
    setDeleteModalOpen(false);
    setViewModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <SEOHead
        title="Notice Management"
        description="Manage notices."
        path="/admin/notices"
      />

      <div className="flex justify-between items-center">
        <h1 className="">
          <span className="text-lg md:text-2xl font-bold">
            Notices Management{" "}
          </span>
          <span className="border rounded-full px-1 font-semibold text-sm md:text-lg lang-en-US">
            {notices.length}
          </span>
        </h1>
        <button className="flex items-center gap-1 sm:gap-2 bg-[#CF4517] hover:bg-[#e24e1c] active:scale-95  transition-all text-white cursor-pointer px-2 sm:px-4 py-2 rounded-md sm:text-base text-sm sm:rounded-lg">
          <Plus size={16} /> Add Notice
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase">
                Event Date
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase">
                Event Time
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center  font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium lang-bn-BD text-nowrap">
                  {notice.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500  text-nowrap">
                    {formatDateDynamic(notice.createdAt)}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500  text-nowrap">
                  {notice.eventTime}
                </td>

                <td className="px-6 py-4 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full
                      ${notice.status === "active" && "bg-green-100 text-green-800"}
                      ${notice.status === "inactive" && "bg-gray-100 text-gray-600"}
                    `}
                  >
                    {notice.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center flex justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-blue-600"
                    onClick={() => openViewModal(notice)}
                  >
                    <Eye size={18} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="text-red-600"
                    onClick={() => openDeleteModal(notice)}
                  >
                    <HiTrash size={18} />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modals */}
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
