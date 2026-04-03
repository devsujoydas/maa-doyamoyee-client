import { useState, useEffect, useMemo } from "react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";

import PreviewModal from "./PreviewModal";
import NoticeCard from "./NoticeCard";
import { useData } from "../../context/DataContext";

/* -------------------- Main Page -------------------- */
const NoticePage = () => {
  const { t } = useTranslation();

  const {notices} = useData()
  const [filter, setFilter] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const today = new Date();

  /* -------- Active Notices -------- */
  const activeNotices = useMemo(() => {
    return notices.filter((n) => {
      if (n.status && n.status !== "active") return false;

      if (n.expiryDate) return new Date(n.expiryDate) >= today;
      if (n.eventDate) return new Date(n.eventDate) >= today;

      return true;
    });
  }, [notices]);

  /* -------- Important First -------- */
  
  /* -------- Filter -------- */

  /* -------- Categories -------- */
  const categories = useMemo(() => {
    const unique = ["all", ...new Set(notices.map((n) => n.category))];
    return unique;
  }, [notices]);

  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="notice" />

        {/* -------- Filter Buttons -------- */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition
                ${
                  filter === cat
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-amber-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* -------- Notices -------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.length > 0 ? (
            notices.map((notice, idx) => (
              <NoticeCard
                key={idx}
                notice={notice}
                onPreview={setSelectedNotice}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {t("no_notice")}
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      <PreviewModal
        selected={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
};

export default NoticePage;
