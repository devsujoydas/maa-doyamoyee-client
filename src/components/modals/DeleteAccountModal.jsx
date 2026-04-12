import React, { useState } from "react";
import Modal from "../ui/Modal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthProvider/authProvider";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { deleteProfile } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProfile();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass={"max-w-xl"}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="p-6 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-red-600">
          {t("delete_account.title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-2">{t("delete_account.description")}</p>

        <p className="text-xs text-red-500 mt-2">
          {t("delete_account.warning")}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300"
          >
            {t("delete_account.cancel")}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 cursor-pointer rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={16} />
            {loading ? "Deleting..." : t("delete_account.confirm")}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default DeleteAccountModal;
