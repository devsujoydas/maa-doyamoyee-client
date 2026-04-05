import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../utils/api";


const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmitPassword = async (data) => {
    try {
      await api.post("/auth/change-password", {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password updated successfully!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className="flex flex-col gap-4">
      <div className="bg-[#F5F5F5] px-5 py-6">
        <h3 className="font-semibold text-lg">Security Settings</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="px-5 pt-5 grid gap-5 text-[14px]">
          {/* Current Password */}
          <div>
            <label className="font-light text-[#4B1E2F] uppercase">
              Current Password
            </label>
            <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2">
              <Lock className="text-zinc-400 w-5" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full outline-none"
              />
              <span
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="cursor-pointer"
              >
                {showCurrentPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            </div>
            {errors.currentPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="font-light text-[#4B1E2F] uppercase">
              New Password
            </label>
            <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2">
              <Lock className="text-zinc-400 w-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full outline-none"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="cursor-pointer"
              >
                {showNewPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            </div>
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-light text-[#4B1E2F] uppercase">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 w-full border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2">
              <Lock className="text-zinc-400 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
                className="w-full outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center py-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default SecuritySettings;
