import  { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Modal from "../ui/Modal";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import toast from "react-hot-toast";

const BlogViewModal = ({
  viewModalOpen,
  setViewModalOpen,
  selectedBlog,
  setSelectedBlog,
  setDeleteModalOpen,
}) => {
  useEffect(() => {
    if (!selectedBlog) return;
    Fancybox.bind("[data-fancybox='blog-image']", {});
    return () => Fancybox.destroy();
  }, [selectedBlog]);

  if (!selectedBlog) return null;

  return (
    <Modal
      wClass="max-w-xl sm:max-w-2xl lg:max-w-3xl"
      isOpen={viewModalOpen}
      onClose={() => setViewModalOpen(false)}
    >
      <div className=" flex flex-col space-y-3 md:space-y-4 md:p-2">
        {/* Image */}
        {selectedBlog.postImg && (
          <div className="overflow-hidden rounded-2xl shadow-lg ">
            <img loading="lazy"
              src={selectedBlog.postImg}
              alt={selectedBlog.title}
              className="w-full h-50 sm:h-70 md:h-75 object-cover transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 text-center lang-bn-BD">
          {selectedBlog.title}
        </h2>

        {/* Views / Comments / Date */}
        <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-xs ">
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
            👁️ {selectedBlog.views?.length || 0} Views
          </span>
          <span className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
            💬 {selectedBlog.comments?.length || 0} Comments
          </span>
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
            📅 {formatDateDynamic(selectedBlog.date)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-xs sm:text-base leading-relaxed text-center lang-bn-BD">
          {selectedBlog.desc}
        </p>

        <div className="flex items-end justify-between flex-wrap gap-3  ">
          {/* 🔥 Author Section */}
          <div className="flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-200 rounded-xl py-2 px-3 cursor-pointer">
            <img loading="lazy"
              src={selectedBlog?.author?.image}
              alt={selectedBlog?.author?.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-semibold text-gray-800 lang-bn-BD">
                {selectedBlog?.author?.name}
              </span>
              <span className="text-gray-500 line-clamp-1">
                @{selectedBlog?.author?.username}
              </span>
            </div>
          </div>

          {/* Approval Select */}
          <div className="flex flex-col  max-w-md">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Approval Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-full px-5 py-2 text-sm text-gray-700 outline-none transition-all cursor-pointer"
              value={selectedBlog.isApproved}
              onChange={(e) => {
                setSelectedBlog({
                  ...selectedBlog,
                  isApproved: e.target.value,
                });
                toast.success(`Status changed to ${e.target.value}`);
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Delete Button */}
          <div className="">
            <button
              className=" w-full sm:w-auto px-8 py-3 bg-red-600 text-xs text-nowrap text-white rounded-full font-semibold hover:bg-red-700 hover:shadow-lg transition-all"
              onClick={() => {
                setViewModalOpen(false);
                setDeleteModalOpen(true);
              }}
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BlogViewModal;
