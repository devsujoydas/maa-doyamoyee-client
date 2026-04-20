import { useState } from "react";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import useBlogs from "../../hooks/useBlogs";

const BlogViewModal = ({
  isOpen,
  onClose,
  selectedBlog,
  setSelectedBlog,
  setDeleteModalOpen,
}) => {
  const { updateStatus } = useBlogs();
  const [loading, setLoading] = useState(false);

  if (!isOpen || !selectedBlog) return null;

  const handleStatusChange = async (status) => {
    if (status === selectedBlog.status) return;
    try {
      setLoading(true);
      await updateStatus({ id: selectedBlog._id, status });
      toast.success(`Status changed to ${status}`);
      setSelectedBlog({ ...selectedBlog, status });
    } catch {
      toast.error("Failed to change status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-3xl ">
      <div className="bg-white rounded-xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>
        <h2 className=" text-base md:text-2xl font-semibold mb-2">{selectedBlog.title}</h2>
        <p className="text-gray-400 flex items-center gap-1 mb-2">
          By
          <span className="text-[#44233B] transition-all cursor-pointer font-medium text-xs md:text-sm">
            {selectedBlog.author.name}
          </span>
        </p>
        <div className="max-h-80 overflow-hidden rounded-lg object-cover my-3">
          {selectedBlog.postImg?.url && (
            <img src={selectedBlog.postImg.url} loading="lazy" alt="" className="w-full" />
          )}
        </div>
        <p className="mb-4 whitespace-pre-line text-xs md:text-sm">{selectedBlog.content}</p>

        <div className="flex items-center justify-between mt-4">
          <div className=" flex flex-wrap gap-3 text-xs md:text-sm">
            <button
              className={`px-3 py-1 rounded ${selectedBlog.status === "pending" ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer`}
              onClick={() => handleStatusChange("pending")}
              disabled={loading}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded ${selectedBlog.status === "approved" ? "bg-green-400 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer`}
              onClick={() => handleStatusChange("approved")}
              disabled={loading}
            >
              Approved
            </button>
            <button
              className={`px-3 py-1 rounded ${selectedBlog.status === "rejected" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer`}
              onClick={() => handleStatusChange("rejected")}
              disabled={loading}
            >
              Rejected
            </button>

          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setDeleteModalOpen(true);
              onClose();
            }}
          >
            Delete
          </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BlogViewModal;
