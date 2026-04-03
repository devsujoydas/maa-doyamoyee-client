import   { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <button
            onClick={() => navigate(-1)}
            className="mb-6 w-fit"
          >
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 grid gap-5"
          >
            {/* New Password */}
            <div>
              <label className="text-sm font-medium">
                {t("reset.new_password")}
              </label>
              <div className="relative mt-1 border border-zinc-300 rounded-full px-4 py-3 flex items-center focus-within:border-zinc-400">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder={t("reset.new_password_placeholder")}
                  className="w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-zinc-500"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">
                {t("reset.confirm_password")}
              </label>
              <div className="relative mt-1 border border-zinc-300 rounded-full px-4 py-3 flex items-center focus-within:border-zinc-400">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder={t("reset.confirm_password_placeholder")}
                  className="w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 text-zinc-500"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button className="mt-2 bg-black text-white py-3 sm:py-4 rounded-full hover:bg-zinc-700 transition">
              {t("reset.button")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;