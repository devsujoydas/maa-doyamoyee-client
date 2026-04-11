import { useEffect, useState, useRef } from "react";
import { formatDynamicDate } from "../../utils/formatDateDynamic";
import { useAuth } from "../../AuthProvider/authProvider";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const BlogPostComment = ({ comments, setComments }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [textMap, setTextMap] = useState({});
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async (comment) => {
    if (!textMap[comment?._id]?.trim())
      return toast.error("Comment cannot be empty");

    try {
      setLoading(true);
      const { data } = await api.put(
        `/posts/${comment?.post}/comments/${comment?._id}`,
        { text: textMap[comment._id] },
      );
      toast.success(data.message);
      setEditingCommentId(null);
      setTextMap((prev) => ({ ...prev, [comment?._id]: data.comment?.text }));
      setComments((prev) =>
        prev.map((c) => (c._id === data.comment?._id ? data?.comment : c)),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (comment) => {
    try {
      setLoading(true);
      const { data } = await api.delete(
        `/posts/${comment.post}/comments/${comment._id}`,
      );
      toast.success(data.message);
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!comments || comments.length === 0)
    return <p className="text-gray-500 pt-4 pb-8 text-center">{t("no_comments_yet")}</p>;

  return (
    <div className="md:max-h-162 max-h-100  overflow-y-auto overflow-x-hidden ">
      {comments.map((comment) => {
        const isOwner = user?._id === comment?.author?._id;
        const isEditing = editingCommentId === comment._id;

        if (textMap[comment._id] === undefined) {
          setTextMap((prev) => ({ ...prev, [comment._id]: comment.text }));
        }

        return (
          <div
            key={comment._id}
            className="flex items-center gap-2.5 p-2 sm:p-3 bg-white rounded-lg shadow-md border border-gray-100 mb-4 lang-bn-BD relative"
          >
            {/* Author Photo */}
            <div className="w-10 h-10  rounded-full border border-zinc-100 overflow-hidden shadow-inner shrink-0">
              {comment.author?.profileImage?.url && (
                <img
                  loading="lazy"
                  src={comment.author?.profileImage?.url}
                  alt={comment?.author?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {comment?.author?.name}
                </h4>
                <div className="flex items-center gap-2 relative">
                  <span className="text-gray-400 text-sm">
                    {formatDynamicDate(comment?.createdAt)}
                  </span>

                  {/* 3-dot menu for owner: show on hover */}
                  {isOwner && !isEditing && (
                    <div ref={menuRef} className="relative group">
                      <button
                        className="text-black hover:text-gray-600 px-1  cursor-pointer"
                        title="Options"
                        onClick={() =>
                          setMenuOpenId(
                            menuOpenId === comment._id ? null : comment._id,
                          )
                        }
                      >
                        ⋮
                      </button>

                      {/* Animated Dropdown */}
                      <AnimatePresence>
                        {menuOpenId === comment._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-28 bg-white overflow-hidden border-zinc-200 border rounded-md shadow-lg z-10 flex flex-col"
                          >
                            <button
                              className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 border-b border-zinc-200"
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setMenuOpenId(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(comment)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Text / Edit */}
              {isEditing ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    value={textMap[comment._id]}
                    onChange={(e) =>
                      setTextMap((prev) => ({
                        ...prev,
                        [comment._id]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 outline-none rounded-md p-2 text-sm sm:text-base resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(comment)}
                      disabled={loading}
                      className="btn-primary"
                      style={{ paddingTop: "5px", paddingBottom: "5px" }}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-4 cursor-pointer bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base ">
                  {comment.text}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogPostComment;
