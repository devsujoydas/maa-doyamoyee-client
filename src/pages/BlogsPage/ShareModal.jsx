import React, { useEffect } from "react";
import { Link2, MessageCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ShareModal = ({ isOpen, onClose, url, title }) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied! Share it anywhere 🚀");
  };

  const shareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      "_blank",
    );
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-80 p-6 relative flex flex-col gap-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 text-gray-500 hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Share this post
            </h3>

            {/* 🔥 Primary Copy Button */}
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-3 p-3 rounded-full bg-[#DB4242] text-white font-medium hover:bg-[#c13636] transition"
            >
              <Link2 size={18} />
              Copy Link
            </button>

            {/* Secondary Options */}
            <button
              onClick={shareWhatsApp}
              className="flex items-center justify-center gap-2 p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
            >
              <MessageCircle size={18} />
              <span className="text-sm">WhatsApp</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
