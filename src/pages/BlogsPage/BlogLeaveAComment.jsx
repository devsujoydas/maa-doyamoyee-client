import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider/authProvider";
import api from "../../utils/api";
import toast from "react-hot-toast"; 

const BlogLeaveAComment = ({ postId, setComments }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState({ text: "" });

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return navigate("/signin");
    }

    if (!text.text.trim()) {
      return toast.error("Comment cannot be empty");
    }

    try {
      setLoading(true);

      const res = await api.post(`/posts/${postId}/comments`, text);

      const newComment = res.data;

      setComments((prev) => [newComment, ...prev]);

      toast.success("Comment added!");

      // ✅ correct reset
      setText({ text: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-5 text-gray-900">
        {t("leave_comment")}
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="text" // ✅ IMPORTANT
            value={text.text}
            onChange={handleChange}
            placeholder={t("enter_comment")}
            className="border border-gray-300 p-3 sm:p-4 outline-none rounded-xl w-full h-24 sm:h-32 resize-none text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="border border-zinc-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition transform flex items-center gap-2 font-semibold justify-center w-full text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? "Posting..." : t("post_comment")}
            <IoIosSend className="text-base sm:text-lg" />
          </button>
        </form>
      ) : (
        <div className="text-center text-gray-700">
          <p className="mb-3 text-sm sm:text-base">{t("login_to_comment")}</p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-[#7E4555] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#B5697E] transition text-sm sm:text-base cursor-pointer"
          >
            {t("auth_signin")}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogLeaveAComment;
