import { FaRegCalendarAlt } from "react-icons/fa";
import omSymbolsvg from "/Om_symbol.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../utils/formatDateDynamic";
import { useState } from "react";
import UserViewModal from "./modals/UserViewModal";
import api from "../utils/api";

const BlogCard = ({ blog }) => {
  const { t } = useTranslation();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);

  const handleView = async () => {
    try {
      setLoadingAuthor(true);

      const res = await api.get(`/users/profile/${blog?.author?._id}`);
     
      setAuthor(res.data.user);
      setViewModalOpen(true);
    } catch (error) {
      console.error("Author fetch error:", error);
    } finally {
      setLoadingAuthor(false);
    }
  };

  return (
    <div className="p-1">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col lang-bn-BD">
        {/* 🔹 Blog Image */}
        <div className="h-70 w-full overflow-hidden">
          <Link to={`/blogs/${blog?._id}`}>
            <img
              loading="lazy"
              src={blog?.postImg || blog?.images?.[0]}
              alt={blog?.title}
              className="w-full h-full object-cover transform hover:scale-125 transition duration-500 cursor-pointer"
            />
          </Link>
        </div>

        {/* 🔹 Blog Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category + Date */}
          <div className="flex items-center gap-5 mb-3">
            <div className="flex gap-1 items-center">
              <img className="w-3 h-3" src={omSymbolsvg} alt="" />
              <span className="text-[13px] font-semibold text-[#44233B]">
                {blog?.category || blog?.tag}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <FaRegCalendarAlt className="text-[#DB4242]" size={14} />
              <span className="text-[13px] font-semibold text-[#44233B]">
                {formatDateDynamic(blog?.createdAt)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl hover:text-[#DB4242] cursor-pointer font-bold mb-2">
            <Link to={`/blogs/${blog?._id}`}>{blog?.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-[#777777] line-clamp-3 text-[16px] mb-4">
            {blog?.content}
          </p>

          {/* Views & Comments */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
            <span>
              👁️ {blog?.views} {t("views")}
            </span>
            <span>
              💬 {blog?.commentCount} {t("comments")}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center mt-auto gap-3">
            <img
              src={blog?.author?.profileImage}
              alt={blog?.author?.name}
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="text-[16px] text-gray-600">
              <p>
                by{" "}
                <span
                  onClick={handleView}
                  className="text-[#DB4242] hover:text-[#44233B] transition-all cursor-pointer font-medium"
                >
                  {blog?.author?.name}
                </span>
              </p>

              {/* Loading text */}
              {loadingAuthor && (
                <span className="text-xs text-gray-400">Loading author...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Modal */}
      <UserViewModal
        isOpen={viewModalOpen}
        setOpen={setViewModalOpen}
        user={author}
      />
    </div>
  );
};

export default BlogCard;
