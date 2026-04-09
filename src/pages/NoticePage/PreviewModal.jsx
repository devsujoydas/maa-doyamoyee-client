import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

const PreviewModal = ({ selected, isOpen, onClose }) => {
  const getPreviewUrl = (url) => url?.replace("/view", "/preview") || "";

  if (!isOpen || !selected) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-100 p-2 rounded-full hover:bg-red-200"
          >
            <X size={18} />
          </button>

          <iframe
            src={getPreviewUrl(selected.pdfUrl)}
            className="w-full h-full rounded-2xl"
          />

          <a
            href={selected.pdfUrl.replace("/preview", "/view")}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 flex items-center gap-1 text-sm bg-green-100 px-3 py-1 rounded-lg hover:bg-green-200"
          >
            <Download size={16} /> Download
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewModal;