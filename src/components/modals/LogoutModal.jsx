import React, { useState } from "react";
import Modal from "../ui/Modal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthProvider/authProvider";
import { LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logout();

      toast.success(t("logout_modal.success"));
      onClose();
    } catch (err) {
      toast.error(t("logout_modal.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal wClass={"max-w-lg"} isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="md:p-6 p-4 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-red-100 p-3 rounded-full">
            <LogOut className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-red-600">
          {t("logout_modal.title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-2">
          {t("logout_modal.description")}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-6 md:text-[16px] text-sm">
          <button
            onClick={onClose}
            className="px-3 py-1.5  md:px-4 md:py-2  rounded-lg bg-gray-200 hover:bg-gray-300  cursor-pointer"
          >
            {t("logout_modal.cancel")}
          </button>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-3 py-1.5  md:px-4 md:py-2  rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 cursor-pointer"
          >
            <LogOut size={16} />
            {loading
              ? t("logout_modal.loading")
              : t("logout_modal.confirm")}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default LogoutModal;