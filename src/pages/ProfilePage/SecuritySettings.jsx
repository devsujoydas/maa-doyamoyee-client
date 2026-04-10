import React, { useState } from "react";
import { Lock, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SecuritySettings = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SIMPLE VALIDATION (backend handles security)
  const validate = () => {
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmNewPassword
    ) {
      toast.error(t("all_fields_required"));
      return false;
    }

    if (form.newPassword.length < 8) {
      toast.error(t("password_min_length"));
      return false;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error(t("password_mismatch"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        currentPassword: form.currentPassword.trim(),
        newPassword: form.newPassword.trim(),
        confirmNewPassword: form.confirmNewPassword.trim(),
      };

      const res = await api.put("/password/change-password", payload);

      toast.success(t("password_updated_success"));

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message;

      switch (msg) {
        case "CURRENT_PASSWORD_INCORRECT":
          toast.error(t("current_password_incorrect"));
          break;
        case "PASSWORD_MISMATCH":
          toast.error(t("password_mismatch"));
          break;
        case "PASSWORD_TOO_SHORT":
          toast.error(t("password_min_length"));
          break;
        case "NEW_PASSWORD_MUST_BE_DIFFERENT":
          toast.error(t("new_password_different"));
          break;
        case "ALL_FIELDS_REQUIRED":
          toast.error(t("all_fields_required"));
          break;
        default:
          toast.error(t("something_went_wrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  const inputWrapper =
    "input-field flex items-center gap-2 mt-1";
  const labelClass = "font-light text-sm text-[#4B1E2F] uppercase";

  return (
    <form onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 bg-[#F9F9F9] rounded-t-xl">
        <h3 className="font-semibold text-lg">
          {t("security_settings")}
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-5"
      >
        {/* CURRENT PASSWORD */}
        <div>
          <label className={labelClass}>
            {t("current_password")}
          </label>

          <div className={inputWrapper}>
            <Lock className="text-zinc-400 w-4.5" />
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder={t("enter_current_password")}
              className="w-full outline-none"
            />

            <span
              className="cursor-pointer"
              onClick={() =>
                setShow((p) => ({ ...p, current: !p.current }))
              }
            >
              {show.current ? (
                <Eye size={18} />
              ) : (
                <EyeClosed size={18} />
              )}
            </span>
          </div>
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label className={labelClass}>
            {t("new_password")}
          </label>

          <div className={inputWrapper}>
            <Lock className="text-zinc-400 w-4.5" />
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder={t("enter_new_password")}
              className="w-full outline-none"
            />

            <span
              className="cursor-pointer"
              onClick={() =>
                setShow((p) => ({ ...p, new: !p.new }))
              }
            >
              {show.new ? (
                <Eye size={18} />
              ) : (
                <EyeClosed size={18} />
              )}
            </span>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className={labelClass}>
            {t("confirm_password")}
          </label>

          <div className={inputWrapper}>
            <Lock className="text-zinc-400 w-4.5" />
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              placeholder={t("confirm_new_password")}
              className="w-full outline-none"
            />

            <span
              className="cursor-pointer"
              onClick={() =>
                setShow((p) => ({
                  ...p,
                  confirm: !p.confirm,
                }))
              }
            >
              {show.confirm ? (
                <Eye size={18} />
              ) : (
                <EyeClosed size={18} />
              )}
            </span>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center pt-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60"
          >
            {loading ? t("updating") : t("save_changes")}
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default SecuritySettings;