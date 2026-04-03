import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Signin = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logInHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/signin", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success(res.data.message || "Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="custom-container flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-2xl shadow-lg border border-zinc-100 xl:grid xl:grid-cols-2 overflow-hidden"
      >
        {/* Image */}
        <div className="hidden xl:block h-[80vh]">
          <img
            src="https://i.pinimg.com/1200x/50/12/a8/5012a8ad6cb9220e9f58ed8374d3a11a.jpg"
            className="h-full w-full object-cover"
            alt="signin"
          />
        </div>

        {/* Form */}
        <div className="px-6 sm:px-10 md:px-14 py-8 sm:py-10 flex flex-col justify-center">

          {/* Back */}
          <button onClick={() => navigate(-1)} className="mb-6 w-fit">
            <ArrowLeft />
          </button>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {t("auth.login_title")}
          </h1>

          <p className="mt-2 text-sm sm:text-base">
            {t("auth.no_account")}{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              {t("auth.create_account")}
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={logInHandler} className="mt-6 grid gap-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">
                {t("auth.email")}
              </label>
              <input
                name="email"
                required
                type="email"
                placeholder={t("auth.email_placeholder")}
                className="w-full mt-1 border border-zinc-300 rounded-full px-4 py-3 outline-none focus:border-zinc-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">
                {t("auth.password")}
              </label>
              <div className="relative mt-1 border border-zinc-300 rounded-full px-4 py-3 flex items-center focus-within:border-zinc-400">
                <input
                  name="password"
                  required
                  type={show ? "text" : "password"}
                  placeholder={t("auth.password_placeholder")}
                  className="w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms + Forgot */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                {t("auth.agree_terms")}{" "}
                <span className="font-semibold">
                  {t("auth.terms")}
                </span>
              </label>

              <Link to="/forgot-password" className="hover:underline">
                {t("auth.forgot_password")}
              </Link>
            </div>

            {/* Button */}
            <button className="bg-black text-white py-3 rounded-full hover:bg-zinc-700">
              {t("auth.login_btn")}
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;