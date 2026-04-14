import { formatDateDynamic } from "../../utils/formatDateDynamic";
import { motion } from "framer-motion";
import { FileText, Download, Eye, MapPin, Pin, Calendar, Clock } from "lucide-react";
import { FaRegCalendarAlt } from "react-icons/fa";

const NoticeCard = ({ notice, onPreview }) => {
  const handlePreview = () => {
    if (onPreview) onPreview(notice);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border w-full h-full border-zinc-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-white lang-bn-BD flex flex-col"
    >
      {/* Top Section */}
       <div className="flex flex-col gap-3 flex-1">
        {/* Title + Pinned */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <FileText className="text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-900">
              {notice.title}
            </h3>
          </div>
          {notice.pinned && <Pin className="text-red-500" size={18} />}
        </div>

        {/* Category + Event Date + Event Time */}
        <div className="flex flex-wrap gap-2">
          {notice.eventDate && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
               <FaRegCalendarAlt className="" size={14} /> {formatDateDynamic(notice.eventDate)}
            </span>
          )}

          {notice.eventTime && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full flex items-center gap-1">
               <Clock className="" size={14} /> {notice.eventTime}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700">{notice.description}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1 mt-4">
        {/* Venue + IssuedBy */}
        {notice.venue && (
          <p className="text-xs flex items-center gap-1 text-gray-500">
            <MapPin size={14} /> {notice.venue}
          </p>
        )}
        {notice.issuedBy && (
          <p className="text-xs text-gray-500">📝 {notice.issuedBy}</p>
        )}

        {/* Footer: Publish Date + Buttons */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500 flex items-center gap-1">
           <FaRegCalendarAlt className="" size={13} /> প্রকাশিত: {formatDateDynamic(notice.createdAt)}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handlePreview}
              className="flex items-center gap-1 text-sm bg-amber-100 px-3 py-1 rounded-lg hover:bg-amber-200 cursor-pointer"
            >
              <Eye size={16} /> View
            </button>

            {notice.pdfUrl && (
              <a
                href={notice.pdfUrl.replace("/view", "/view")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm bg-green-100 px-3 py-1 rounded-lg hover:bg-green-200 cursor-pointer"
              >
                <Download size={16} /> PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
