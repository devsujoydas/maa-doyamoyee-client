import React, { useEffect, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import { ThumbsUp, Share2, MessageCircle, Eye } from "lucide-react";
import ShareModal from "./ShareModal";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider/authProvider";
import toast from "react-hot-toast";

const BlogPostCard = ({ blog, profile }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [shareOpen, setShareOpen] = useState(false);
  const [reacts, setReacts] = useState(blog?.reacts || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='blog-image']", {});
    return () => Fancybox.unbind("[data-fancybox='blog-image']");
  }, []);

  useEffect(() => {
    setReacts(blog?.reacts || []);
  }, [blog]);

  const shareUrl = `${window.location.origin}/blogs/${blog?._id}`;
  const isLiked = reacts?.some((id) => id === user?._id);

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

  const handleShare = () => {
    setShareOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-3 border border-zinc-200">
      {/* IMAGE */}

      {blog?.postImg && (
        <div className="rounded-xl overflow-hidden">
          <a
            href={blog.postImg}
            data-fancybox="blog-image"
            data-caption={blog.title}
            className="overflow-hidden"
          >
            <img
              src={blog.postImg}
              alt={blog.title}
              className="w-full h-full object-cover transition duration-300 hover:scale-105"
            />
          </a>
        </div>
      )}

      {/* CONTENT */}
      <div className="px-3 py-4 sm:py-5 sm:px-5">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
          {blog?.title}
        </h2>
        <div className="text-gray-500 text-xs sm:text-sm mb-4">
          📅 {formatDateDynamic(blog?.createdAt)}
        </div>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {profile === "true"
            ? (blog?.content || "").slice(0, 200) + "..."
            : blog?.content}
        </p>
      </div>

      {/* FACEBOOK STYLE ACTION BAR */}
      <div className="flex justify-between items-center border-t border-gray-200 px-4 sm:px-6 py-2">
        {/* Left side: React / Comment / Views */}
        <div className="flex items-center gap-6">
          {/* React */}
          <button
            onClick={handleReact}
            className={`flex items-center gap-1 text-sm font-medium transition cursor-pointer ${
              isLiked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} />
            <span className="flex justify-center items-center gap-1">
              {reacts?.length || 0}{" "}
              <span className="sm:block hidden">  {t("likes")}</span>
            </span>
          </button>

          {/* Comment */}
          <div className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-600 cursor-pointer">
            <MessageCircle size={18} />
            <span className="flex justify-center items-center gap-1">
              {blog?.commentCount || 0}
              <span className="sm:block hidden">{t("comments")}</span>
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Eye size={18} />
            <span className="flex justify-center items-center gap-1">
              {blog?.views?.length || 0}{" "}
              <span className="sm:block hidden">{t("views")}</span>
            </span>
          </div>
        </div>

        {/* Right side: Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm font-medium"
        >
          <Share2 size={18} />
          <span>{t("share")}</span>
        </button>
      </div>

      {/* SHARE MODAL */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        title={blog?.title}
      />
    </div>
  );
};

export default BlogPostCard;
