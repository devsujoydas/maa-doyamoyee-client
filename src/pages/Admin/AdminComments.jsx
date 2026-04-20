import React, { useState, useMemo } from "react";
import useComments from "../../hooks/useComments";
import toast from "react-hot-toast";
import DeleteModal from "../../components/modals/DeleteModal";
import CommentViewModal from "../../components/modals/CommentViewModal";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AdminComments = () => {
  const { comments = [], deleteComment, isLoading } = useComments();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewComment, setViewComment] = useState(null);

  const [search, setSearch] = useState("");

  // ---------------- DELETE ----------------
  const openDeleteModal = (comment) => {
    setSelectedComment(comment);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setSelectedComment(null);
  };

  // ---------------- VIEW ----------------
  const openViewModal = (comment) => {
    setViewComment(comment);
    setViewOpen(true);
  };

  const closeViewModal = () => {
    setViewOpen(false);
    setViewComment(null);
  };

  // ---------------- DELETE CONFIRM ----------------
  const confirmDelete = async () => {
    try {
      await deleteComment({
        postId: selectedComment.post,
        commentId: selectedComment._id,
      });

      toast.success("Comment deleted successfully 🔥");
      closeDeleteModal();
    } catch (err) {
      toast.error("Failed to delete comment ❌");
    }
  };

  // ---------------- FILTER ----------------
  const filteredComments = useMemo(() => {
    if (!search.trim()) return comments;

    return comments.filter((c) => {
      const text = c.text?.toLowerCase() || "";
      const name = c.author?.name?.toLowerCase() || "";
      const username = c.author?.username?.toLowerCase() || "";

      return (
        text.includes(search.toLowerCase()) ||
        name.includes(search.toLowerCase()) ||
        username.includes(search.toLowerCase())
      );
    });
  }, [comments, search]);

  // ---------------- LOADING ----------------
  if (isLoading) {
    return <p className="text-center py-10">Loading comments...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* HEADER */}
      <div className="flex flex-col gap-3 mb-5">
        <h1 className="text-lg md:text-2xl font-bold">
          Comments ({filteredComments.length})
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search comments..."
          className="input-field mt-2"
        />
      </div>

      {/* EMPTY */}
      {!comments?.length ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <p className="text-center py-10">{t("no_comments_yet")}</p>
        </div>
      ) : (
        // GRID
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredComments.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.03,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="border border-zinc-200 rounded-xl p-4 flex flex-col justify-between h-full hover:shadow-lg transition"
            >
              {/* TOP */}
              <div
                
                className="flex items-start justify-between gap-3 cursor-pointer h-full"
              >
                {/* LEFT */}
                <div className="flex items-start gap-3 h-full " onClick={() => openViewModal(comment)}  >
                  <img
                    src={comment.author?.profileImage?.url}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />

                  <div>
                    <h4 className="font-semibold text-sm">
                      {comment.author?.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      @{comment.author?.username}
                    </p>

                    <p className="mt-2 text-sm text-gray-700 line-clamp-2 wrap-break-word">
                      {comment.text}
                    </p>
                  </div>
                </div>

                {/* DATE */}
                <div className="text-xs text-gray-400 whitespace-nowrap h-full flex flex-col justify-between  ">
                  {new Date(comment.createdAt).toLocaleString()}
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openDeleteModal(comment)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* DELETE */}
            </motion.div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        confirmDelete={confirmDelete}
        selected={{
          ...selectedComment,
          title: selectedComment?.text?.slice(0, 20) + "...",
        }}
        isUser={false}
      />

      {/* VIEW MODAL */}
      <CommentViewModal
        isOpen={viewOpen}
        onClose={closeViewModal}
        comment={viewComment}
      />
    </motion.div>
  );
};

export default AdminComments;
