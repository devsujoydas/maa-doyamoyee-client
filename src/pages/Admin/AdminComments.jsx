import React, { useState, useMemo } from "react";
import useComments from "../../hooks/useComments";
import toast from "react-hot-toast";
import DeleteModal from "../../components/modals/DeleteModal";
import CommentViewModal from "../../components/modals/CommentViewModal";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const AdminComments = () => {
  const { comments = [], deleteComment, isLoading } = useComments();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewComment, setViewComment] = useState(null);

  // 🔍 SEARCH STATE
  const [search, setSearch] = useState("");

  // ---------------- DELETE MODAL ----------------
  const openDeleteModal = (comment) => {
    setSelectedComment(comment);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setSelectedComment(null);
  };

  // ---------------- VIEW MODAL ----------------
  const openViewModal = (comment) => {
    setViewComment(comment);
    setViewOpen(true);
  };

  const closeViewModal = () => {
    setViewOpen(false);
    setViewComment(null);
  };

  // ---------------- DELETE ----------------
  const confirmDelete = async () => {
    try {
      await deleteComment({
        postId: selectedComment.post,
        commentId: selectedComment._id,
      });

      toast.success("Comment deleted successfully 🔥");
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment ❌");
    }
  };

  // ---------------- FILTERED COMMENTS ----------------
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
    <div className="">
      {/* 🔥 TITLE + SEARCH */}
      <div className="flex flex-col  gap-3 mb-5">
        <h1 className="text-lg md:text-2xl font-bold flex-1">
          Comments ({filteredComments.length})
        </h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search comments..."
          className="input-field flex-1"
        />
      </div>

      {/* GRID */}

      {!comments?.length ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <p className="text-center  py-10">{t("no_comments_yet")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredComments.map((comment) => (
            <div
              key={comment._id}
              className="border border-zinc-200 rounded-xl p-4 flex flex-col justify-between h-full hover:shadow-lg transition"
            >
              {/* TOP */}
              <div
                onClick={() => openViewModal(comment)}
                className="flex items-start justify-between gap-3 cursor-pointer"
              >
                {/* LEFT */}
                <div className="flex items-start gap-3">
                  <img
                    src={comment.author?.profileImage?.url}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />

                  <div className="w-full">
                    <h4 className="font-semibold text-sm">
                      {comment.author?.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      @{comment.author?.username}
                    </p>

                    {/* PREVIEW */}
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2 break-words">
                      {comment.text}
                    </p>
                  </div>
                </div>

                {/* RIGHT DATE */}
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </div>

              {/* DELETE */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => openDeleteModal(comment)}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
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
    </div>
  );
};

export default AdminComments;
