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

  // ---------------------------
  // CLOSE MENU OUTSIDE CLICK
  // ---------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------------------
  // UPDATE COMMENT
  // ---------------------------
  const handleUpdate = async (comment) => {
    if (!textMap[comment?._id]?.trim()) {
      return toast.error(t("comment_empty_error") || "Comment cannot be empty");
    }

    try {
      setLoading(true);

      const { data } = await api.put(
        `/posts/${comment?.post}/comments/${comment?._id}`,
        { text: textMap[comment._id] }
      );

      toast.success(
        data?.message || t("comment_updated_success")
      );

      setEditingCommentId(null);

      setTextMap((prev) => ({
        ...prev,
        [comment._id]: data.comment?.text,
      }));

      setComments((prev) =>
        prev.map((c) =>
          c._id === data.comment?._id ? data.comment : c
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // DELETE COMMENT
  // ---------------------------
  const handleDelete = async (comment) => {
    try {
      setLoading(true);

      const { data } = await api.delete(
        `/posts/${comment.post}/comments/${comment._id}`
      );

      toast.success(
        data?.message || t("comment_deleted_success")
      );

      setComments((prev) =>
        prev.filter((c) => c._id !== comment._id)
      );
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // EMPTY STATE
  // ---------------------------
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 pt-6 pb-8 text-center">
        {t("no_comments_yet")}
      </p>
    );
  }

  return (
    // 🔥 FIXED HEIGHT SCROLL CONTAINER
    <div className="space-y-4 py-2 max-h-[500px] overflow-y-auto pr-2">
      {comments.map((comment) => {
        const isOwner = user?._id === comment?.author?._id;
        const isEditing = editingCommentId === comment._id;

        // init textMap safely
        if (textMap[comment._id] === undefined) {
          setTextMap((prev) => ({
            ...prev,
            [comment._id]: comment.text,
          }));
        }

        return (
          <div
            key={comment._id}
            className="flex gap-3 p-3 bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition relative"
          >
            {/* ---------------- AVATAR ---------------- */}
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-200">
              {comment.author?.profileImage?.url && (
                <img
                  src={comment.author?.profileImage?.url}
                  alt={comment.author?.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* ---------------- CONTENT ---------------- */}
            <div className="flex-1">
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">
                    {comment.author?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    @{comment.author?.username}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-2 relative">
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">
                    {formatDynamicDate(comment?.createdAt)}
                  </span>

                  {/* MENU */}
                  {isOwner && !isEditing && (
                    <div ref={menuRef}>
                      <button
                        onClick={() =>
                          setMenuOpenId(
                            menuOpenId === comment._id
                              ? null
                              : comment._id
                          )
                        }
                        className="text-gray-500 hover:text-black px-1"
                      >
                        ⋮
                      </button>

                      <AnimatePresence>
                        {menuOpenId === comment._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 mt-2 w-28 bg-white border border-zinc-200 rounded-md shadow-lg z-20 overflow-hidden"
                          >
                            <button
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setMenuOpenId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b border-zinc-200"
                            >
                              {t("edit")}
                            </button>

                            <button
                              onClick={() => handleDelete(comment)}
                              disabled={loading}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              {t("delete")}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* ---------------- BODY ---------------- */}
              {isEditing ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={textMap[comment._id]}
                    onChange={(e) =>
                      setTextMap((prev) => ({
                        ...prev,
                        [comment._id]: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none resize-none"
                    rows={3}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(comment)}
                      disabled={loading}
                      className="btn-primary text-sm"
                    >
                      {loading
                        ? t("saving")
                        : t("save") || "Save"}
                    </button>

                    <button
                      onClick={() =>
                        setEditingCommentId(null)
                      }
                      className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-700 leading-relaxed break-words">
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