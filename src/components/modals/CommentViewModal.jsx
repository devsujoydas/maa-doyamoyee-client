import { Link } from "react-router-dom";
import Modal from "../ui/Modal";
import { FaTimes } from "react-icons/fa";

const CommentViewModal = ({ isOpen, onClose, comment }) => {
  if (!isOpen || !comment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-2xl">
      <div className="bg-white rounded-xl p-5 relative">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>

        {/* 👤 Author */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={comment.author?.profileImage?.url}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-sm">{comment.author?.name}</h4>
            <p className="text-xs text-gray-500">@{comment.author?.username}</p>
          </div>
        </div>

        {/* 💬 Comment */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap break-words">
            {comment.text}
          </p>
        </div>

        {/* 📅 Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {/* Date */}
          <p className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </p>

          {/* View Post Button */}
          <Link to={`/blogs/${comment.post}`} className="btn-primary text-xs">
            View Post
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CommentViewModal;
