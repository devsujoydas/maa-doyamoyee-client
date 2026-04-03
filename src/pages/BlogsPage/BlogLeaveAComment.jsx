import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BlogLeaveAComment = ({ user }) => {
  const { t } = useTranslation();

  const [comment, setComment] = useState({ message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return; // extra check
    // console.log("Comment submitted:", comment, "by user:", user);
    setComment({ message: "" });
    // backend call for storing comment with user info
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-5 text-gray-900">
        {t("leave_comment")}
      </h2>

      {user ? (
        // If logged in, show comment box
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="message"
            value={comment.message}
            onChange={handleChange}
            placeholder={t("enter_comment")}
            className="border border-gray-300 p-3 sm:p-4 rounded-xl w-full h-24 sm:h-32 resize-none focus:ring-2 focus:ring-[#7E4555] focus:outline-none text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="bg-linear-to-r from-[#7E4555] to-[#B5697E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition transform flex items-center gap-2 font-semibold justify-center w-full text-sm sm:text-base"
          >
            {t("post_comment")} <IoIosSend className="text-base sm:text-lg" />
          </button>
        </form>
      ) : (
        // If not logged in, show login prompt
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
