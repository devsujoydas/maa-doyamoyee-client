import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Signup = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    const name = e.target.fullname.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/signup", {
        name,
        phone,
        email,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success(res.data.message || "Signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
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
            src="https://i.pinimg.com/736x/c6/1f/e6/c61fe61a74478938a5552a6070714ab4.jpg"
            className="h-full w-full object-cover"
            alt="signup"
          />
        </div>

        {/* Form */}
        <div className="px-5 sm:px-8 md:px-10 py-8 sm:py-10 flex flex-col justify-center">

          {/* Back */}
          <button onClick={() => navigate(-1)} className="mb-6 w-fit">
            <ArrowLeft />
          </button>

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {t("auth.signup_title")}
          </h1>

          <p className="mt-2 text-sm sm:text-base">
            {t("auth.have_account")}{" "}
            <Link to="/signin" className="font-semibold hover:underline">
              {t("auth.login_here")}
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={signUpHandler} className="mt-6 grid gap-5">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">
                {t("auth.fullname")}
              </label>
              <input
                name="fullname"
                required
                placeholder={t("auth.fullname_placeholder")}
                className="w-full mt-1 border border-zinc-300 rounded-full px-4 py-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium">
                {t("auth.phone")}
              </label>
              <input
                name="phone"
                required
                placeholder={t("auth.phone_placeholder")}
                className="w-full mt-1 border border-zinc-300 rounded-full px-4 py-3"
              />
            </div>

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
                className="w-full mt-1 border border-zinc-300 rounded-full px-4 py-3"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">
                {t("auth.password")}
              </label>
              <div className="relative mt-1 border border-zinc-300 rounded-full px-4 py-3 flex items-center">
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

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required />
              {t("auth.agree_terms")}{" "}
              <span className="font-semibold">
                {t("auth.terms")}
              </span>
            </label>

            {/* Button */}
            <button className="bg-black text-white py-3 rounded-full hover:bg-zinc-700">
              {t("auth.signup_btn")}
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;