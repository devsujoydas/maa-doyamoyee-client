import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

const PreviewNoticeModal = ({ notice, onClose }) => {
  const [showPDF, setShowPDF] = useState(false);
  if (!notice) return null;

  const getPreviewUrl = (url) => url?.replace("/view", "/preview") || "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-100 p-2 rounded-full hover:bg-red-200"
          >
            <X size={18}/>
          </button>

          <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
          <p className="text-sm text-gray-600 mb-2">Category: {notice.category}</p>
          <p className="text-sm text-gray-600 mb-4">Status: {notice.status}</p>
          {notice.issuedBy && <p className="mb-1">Issued By: {notice.issuedBy}</p>}
          {notice.venue && <p className="mb-1">Venue: {notice.venue}</p>}
          {notice.eventDate && <p className="mb-1">Event Date: {notice.eventDate?.slice(0,10)}</p>}
          {notice.eventTime && <p className="mb-4">Event Time: {notice.eventTime}</p>}
          <p className="mb-4 whitespace-pre-line">{notice.description}</p>

          {notice.pdfUrl && !showPDF && (
            <button onClick={()=>setShowPDF(true)} className="btn-primary flex items-center gap-1">
              <Download size={16}/> View PDF
            </button>
          )}

          {showPDF && notice.pdfUrl && (
            <div className="mt-4">
              <iframe src={getPreviewUrl(notice.pdfUrl)} className="w-full h-[60vh] rounded-2xl border"/>
              <a
                href={notice.pdfUrl.replace("/preview","/view")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm bg-green-100 px-3 py-1 rounded-lg hover:bg-green-200"
              >
                <Download size={16}/> Download PDF
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewNoticeModal;