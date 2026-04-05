import React, { useState } from "react";
import { Lock, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { motion } from "framer-motion";


const SecuritySettings = () => {
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!form.newPassword) newErrors.newPassword = "New password is required";
    else if (form.newPassword.length < 8)
      newErrors.newPassword = "At least 8 characters required";
    else if (!form.newPassword.match(/^(?=.*[A-Z])(?=.*\d).+$/))
      newErrors.newPassword = "Must include uppercase & number";

    if (!form.confirmNewPassword)
      newErrors.confirmNewPassword = "Confirm password is required";
    else if (form.confirmNewPassword !== form.newPassword)
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        currentPassword: form.currentPassword.trim(),
        newPassword: form.newPassword.trim(),
        confirmNewPassword: form.confirmNewPassword.trim(),
      };

      await api.put("/password/change-password", payload);
      toast.success("Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  const inputWrapper =
    "input-field flex justify-center items-center gap-2 mt-1 ";
  const labelClass = "font-light text-sm text-[#4B1E2F] uppercase";

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex justify-between items-center p-6  bg-[#F9F9F9] rounded-t-xl">
        <h3 className="font-semibold text-lg">Security Settings</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-5"
      >
        {/* Current Password */}
        <div>
          <label className={labelClass}>Current Password</label>
          <div className={inputWrapper}>
            <Lock className="text-zinc-400 w-4.5  " />
            <input
              type={show.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full outline-none"
            />
            <span
              onClick={() =>
                setShow((prev) => ({ ...prev, current: !prev.current }))
              }
              className="cursor-pointer"
            >
              {show.current ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>
          {errors.currentPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className={labelClass}>New Password</label>
          <div className={inputWrapper}>
            <Lock className="text-zinc-400  w-4.5  " />
            <input
              type={show.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full outline-none"
            />
            <span
              onClick={() => setShow((prev) => ({ ...prev, new: !prev.new }))}
              className="cursor-pointer"
            >
              {show.new ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>

         
          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelClass}>Confirm Password</label>
          <div className={inputWrapper}>
            <Lock className="text-zinc-400  w-4.5  " />
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={form.confirmNewPassword}
              onChange={handleChange}
              className="w-full outline-none"
            />
            <span
              onClick={() =>
                setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
              className="cursor-pointer"
            >
              {show.confirm ? <Eye size={18} /> : <EyeClosed size={18} />}
            </span>
          </div>

          {errors.confirmNewPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-3">
          <button
            type="submit"
            className="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default SecuritySettings;
