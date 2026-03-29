import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import placeholder from "/placeholder.png";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const NoticeSidebar = ({ notices = [] }) => {
  if (!notices.length) return null;

  return (
    <div className="w-full lg:w-1/3 space-y-8 rounded-xl">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
          সাম্প্রতিক নোটিশ
        </h3>

        <div className="space-y-3">
          {notices.slice(0, 3).map((notice) => (
            <motion.div
              key={notice.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 items-center pb-3 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <Link to={`/notices/${notice.id}`}>
                <img loading="lazy"
                  src={notice.thumbnail || placeholder}
                  alt={notice.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
              </Link>
              <div className="flex flex-col">
                <Link to={`/notices/${notice.id}`}>
                  <h4 className="text-gray-800 hover:text-red-500 font-semibold text-xs sm:text-base line-clamp-2">
                    {notice.title}
                  </h4>
                </Link>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {notice.eventDate || notice.publishDate
                    ? formatDateDynamic(notice.eventDate || notice.publishDate)
                    : ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeSidebar;