/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeClosed, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const token = searchParams.get("token");

  // ✅ Verify token on load
  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      navigate("/signin");
      return;
    }

    const verifyToken = async () => {
      try {
        await api.get(`/password/verify-reset-token?token=${token}`);
        toast.success("Link verified");
      } catch (err) {
        toast.error("Link expired or invalid");
        navigate("/forgot-password");
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Invalid token");
    }

    if (!form.newPassword || !form.confirmPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.post("/password/reset-password", {
        token,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmPassword,
      });

      toast.success(res.data.message);

      // small delay for better UX
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state while verifying
  if (verifying) {
    return (
      <div className="custom-container flex items-center justify-center h-screen">
        <p className="text-lg">Verifying link...</p>
      </div>
    );
  }

  return (
    <div className="custom-container flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-2xl shadow-lg border border-zinc-100 xl:grid xl:grid-cols-2 overflow-hidden"
      >
        {/* Image */}
        <div className="hidden xl:block h-[80vh]">
          <img
            src="https://i.pinimg.com/736x/5d/8a/f5/5d8af50360d9fa8e237c77e3f82236f0.jpg"
            alt="reset-password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="px-6 sm:px-10 md:px-14 py-8 sm:py-10 flex flex-col justify-center">
          {/* Back */}
          <button onClick={() => navigate(-1)} className="mb-6 w-fit">
            <ArrowLeft className="active:scale-95" />
          </button>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
            {t("reset.title")}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600">
            {t("reset.subtitle")}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            {/* New Password */}
            <div>
              <label className="text-sm font-medium">
                {t("reset.new_password")}
              </label>
              <div className="relative mt-1 input-field">
                <input
                  type={show ? "text" : "password"}
                  name="newPassword"
                  required
                  onChange={handleChange}
                  placeholder={t("reset.new_password_placeholder")}
                  className="w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-3.5 cursor-pointer text-zinc-500"
                >
                  {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">
                {t("reset.confirm_password")}
              </label>
              <div className="relative mt-1 input-field">
                <input
                  type={show ? "text" : "password"}
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  placeholder={t("reset.confirm_password_placeholder")}
                  className="w-full outline-none  "
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-3.5 cursor-pointer text-zinc-500"
                >
                  {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="mt-2 bg-black text-white py-3 sm:py-4 rounded-full hover:bg-zinc-700 transition"
            >
              {loading ? "Resetting..." : t("reset.button")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
