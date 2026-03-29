import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import placeholder from "/placeholder.png";
import LazyImage from "../../components/LazyImage";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const NoticeCard = ({ notice }) => {
  const {
    id,
    title,
    shortDescription,
    thumbnail,
    publishDate,
    eventDate,
    isImportant,
    isPinned,
    category,
  } = notice;

  const displayDate = eventDate || publishDate;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group relative"
    >
      {/* IMAGE */}
      <Link to={`/notices/${id}`} className="relative block w-full h-70">
        <LazyImage
          src={thumbnail || placeholder}
          alt={title}
          className="w-full 70 object-cover group-hover:scale-105 transition-all duration-300"
          placeholder={placeholder}
        />

        {isImportant && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
            গুরুত্বপূর্ণ
          </span>
        )}
        {isPinned && (
          <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow">
            📌 পিন করা
          </span>
        )}
      </Link>

      {/* CONTENT */}
      <div className="p-5 lang-bn-BD">
        <p className="text-sm text-gray-500 mb-2">
          {displayDate && formatDateDynamic(displayDate)}
        </p>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>

        <p className="text-gray-600 text-sm line-clamp-3">{shortDescription}</p>



        <div className="flex items-center gap-2 mt-4">

          {category && (
            <span className="inline-block text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full capitalize">
              {category}
            </span>
          )}

          <Link
            to={`/notices/${id}`}
            className="inline-block text-indigo-600 font-medium hover:underline"
          >
            বিস্তারিত দেখুন →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NoticeCard;