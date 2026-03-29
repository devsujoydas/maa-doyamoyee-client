import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone } from "react-icons/fa";
import placeholder from "/placeholder.png";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import NoticeSidebar from "./NoticeSidebar";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import { useTranslation } from "react-i18next";

const categoryColors = {
  event: "bg-red-600",
  religious: "bg-purple-600",
  meeting: "bg-indigo-600",
  announcement: "bg-green-600",
};

const NoticeDetails = () => {
   const { t } = useTranslation();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='notice-gallery']", {});

    fetch("/json/notice.json")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        const found = data.find((item) => item.id === id);
        setNotice(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => Fancybox.unbind("[data-fancybox='notice-gallery']");
  }, [id]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  if (!notice)
    return (
      <p className="text-center py-20 text-gray-500">Notice not found.</p>
    );

  const {
    title,
    description,
    shortDescription,
    thumbnail,
    publishDate,
    eventDate,
    eventTime,
    venue,
    contactPerson,
    contactPhone,
    category,
    isImportant,
    isPinned,
    images,
  } = notice;

  const displayDate = eventDate || publishDate;
  const imageSrc = thumbnail || placeholder;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/notices")}
        className="inline-block cursor-pointer mb-8 text-indigo-600 hover:underline"
      >
        ← {t("back_to_all_notices")}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" flex flex-col lg:flex-row gap-8"
      >


        {/* Main Content */}
        <div className="flex-1">

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">

            {/* Badges */}
            <div className="mb-6 flex flex-wrap gap-3">
              {isImportant && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  গুরুত্বপূর্ণ
                </span>
              )}
              {isPinned && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  📌 পিন করা
                </span>
              )}
              {category && (
                <span
                  className={`${categoryColors[category] || "bg-gray-500"
                    } text-white px-3 py-1 rounded-full text-sm capitalize`}
                >
                  {category}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

            {/* Date */}
            {displayDate && (
              <p className="text-gray-500 mb-6">
                <FaCalendarAlt className="inline mr-2" />
                {formatDateDynamic(displayDate)}
                {eventTime && ` | ${eventTime}`}
              </p>
            )}

            {/* Main Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-inner">
              <a href={imageSrc} data-fancybox="notice-gallery" data-caption={title}>
                <img loading="lazy"
                  src={imageSrc}
                  alt={title}
                  className="w-full max-h-125 object-cover hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description || shortDescription}
            </p>

            {/* Extra Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-gray-700">
              {venue && (
                <div>
                  <FaMapMarkerAlt className="inline mr-2 text-indigo-600" />
                  <span className="font-semibold">স্থান:</span> {venue}
                </div>
              )}

              {contactPerson && (
                <div>
                  <FaUser className="inline mr-2 text-indigo-600" />
                  <span className="font-semibold">যোগাযোগ:</span> {contactPerson}
                </div>
              )}

              {contactPhone && (
                <div>
                  <FaPhone className="inline mr-2 text-indigo-600" />
                  <span className="font-semibold">ফোন:</span> {contactPhone}
                </div>
              )}
            </div>

            {/* Gallery */}
            {images && images.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6">গ্যালারি</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <a
                      key={idx}
                      href={img}
                      data-fancybox="notice-gallery"
                      data-caption={title}
                      className="block rounded-xl overflow-hidden"
                    >
                      <img loading="lazy"
                        src={img}
                        alt={`gallery-${idx}`}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <NoticeSidebar
          notices={notices.filter((n) => n.id !== notice.id).slice(0, 3)}
        />
      </motion.div>
    </div>
  );
};

export default NoticeDetails;