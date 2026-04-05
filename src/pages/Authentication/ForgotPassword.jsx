/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      setLoading(true);

      const res = await api.post("/password/request-reset", { email });
     
      toast.success(res.data?.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-container flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-2xl shadow-lg border border-zinc-100 xl:grid xl:grid-cols-2 overflow-hidden"
      >
        {/* Image Section */}
        <div className="hidden xl:block h-[80vh]">
          <img
            src="https://i.pinimg.com/736x/4a/03/f1/4a03f1f812025d013e984d80af220491.jpg"
            alt="forgot-password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="px-6 sm:px-10 md:px-14 py-8 sm:py-10 flex flex-col justify-center">
          {/* Back */}
          <button onClick={() => navigate(-1)} className="mb-6 w-fit">
            <ArrowLeft className="active:scale-95" />
          </button>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
            {t("forgot.title")}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600">
            {t("forgot.subtitle")}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">{t("forgot.email")}</label>
              <input
                type="email"
                name="email"
                required
                placeholder={t("forgot.email_placeholder")}
                className="mt-1 input-field"
              />
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Sending..." : t("forgot.button")}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-sm flex justify-center gap-1">
            {t("forgot.back")}
            <Link to="/signin" className="font-semibold hover:underline">
              {t("forgot.login")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
