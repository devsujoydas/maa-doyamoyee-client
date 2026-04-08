import { FaRegCalendarAlt } from "react-icons/fa";
import omSymbolsvg from "/Om_symbol.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../utils/formatDateDynamic";
import { useEffect, useState } from "react";
import UserViewModal from "./modals/UserViewModal";
import api from "../utils/api";
import { useAuth } from "../AuthProvider/authProvider";
import { Eye, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";
import ShareModal from "../pages/BlogsPage/ShareModal";

const BlogCard = ({ blog, type }) => {
  const { t } = useTranslation();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const { user } = useAuth();

  const [reacts, setReacts] = useState(blog?.reacts || []);
  const [loading, setLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setReacts(blog?.reacts || []);
  }, [blog]);

  const isLiked = reacts?.some((id) => id === user?._id);

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

  const handleReact = async () => {
    if (!user) return toast.error("Login required");
    if (loading) return;

    setLoading(true);
    try {
      if (isLiked) {
        setReacts((prev) =>
          prev.filter((id) => id !== user._id && id?._id !== user._id),
        );
        toast.success("Unliked!");
      } else {
        setReacts((prev) => [...prev, user._id]);
        toast.success("Liked!");
      }

      await api.patch(`/posts/${blog._id}/react`);
    } catch (err) {
      setReacts(blog?.reacts || []);
      toast.error("Failed to react");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = `${window.location.origin}/blogs/${blog?._id}`;

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied! Share it anywhere 🚀");
    setShareOpen(true);
  };

  return (
    <div className="shadow-lg hover:shadow-xl transition-all border border-zinc-200 rounded-lg overflow-hidden">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl p-3 transition-all duration-300 flex flex-col lang-bn-BD">
        {/* 🔹 Blog Image */}
        <div className="h-70 w-full overflow-hidden rounded-lg">
          <Link to={`/blogs/${blog?._id}`}>
            <img
              loading="lazy"
              src={blog?.postImg?.url}
              alt={blog?.title}
              className="w-full h-full object-cover transform hover:scale-125 transition duration-500 cursor-pointer"
            />
          </Link>
        </div>

        {/* 🔹 Blog Content */}
        <div className="px-3 pt-4 pb-2 flex flex-col flex-1">
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
          <h3 className=" hover:text-[#DB4242] text-xl sm:text-2xl font-bold mb-2 text-gray-900">
            <Link to={`/blogs/${blog?._id}`}>{blog?.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed] line-clamp-3  mb-4">
            {blog?.content}
          </p>

          {/* Views & Comments */}
          <div className="flex items-center justify-between gap-4 text-gray-500 text-lg ">
            <div className="flex items-center gap-4 text-gray-500 ">
              <button
                onClick={handleReact}
                className={`flex items-center  gap-1 text-sm font-medium transition cursor-pointer ${
                  isLiked
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                <span className="flex justify-center items-center gap-1">
                  {reacts?.length || 0}
                  <span className="sm:flex hidden"> {t("likes")}</span>
                </span>
              </button>

              <Link to={`/blogs/${blog?._id}`}>
                <div className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-600 cursor-pointer">
                  <MessageCircle size={16} />
                  <span className="flex justify-center items-center gap-1">
                    {blog?.commentCount || 0}
                    <span className="sm:block hidden"> {t("comments")}</span>
                  </span>
                </div>
              </Link>

              {/* Views
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Eye size={16} />
                <span className="flex justify-center items-center gap-1">
                  {blog?.views?.length || 0}
                  <span className="sm:block hidden"> {t("views")}</span>
                </span>
              </div> */}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm font-medium cursor-pointer"
            >
              <Share2 size={18} />
              <span className="sm:block hidden"> {t("share")}</span>
            </button>
          </div>

          {/* Author */}
          {user?.role === "admin" && (
            <div className="flex items-center gap-3 mt-4">
              <img
                src={blog?.author?.profileImage}
                alt={blog?.author?.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div className="text-[16px] text-gray-600">
                <p>
                  by{" "}
                  {type == "blog-page" ? (
                    <span
                      onClick={handleView}
                      className="text-[#DB4242] hover:text-[#44233B] transition-all cursor-pointer font-medium"
                    >
                      {blog?.author?.name}
                    </span>
                  ) : (
                    <span
                      className="text-[#DB4242] hover:text-[#44233B] transition-all cursor-pointer font-medium"
                    >
                      {blog?.author?.name}
                    </span>
                  )}
                </p>

                {/* Loading text */}
                {loadingAuthor && (
                  <span className="text-xs text-gray-400">
                    Loading author...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Modal */}
      <UserViewModal
        isOpen={viewModalOpen}
        setOpen={setViewModalOpen}
        user={author}
      />

      {/* <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        title={blog?.title}
      /> */}
    </div>
  );
};

export default BlogCard;
