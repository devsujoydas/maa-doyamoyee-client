import { useState, useEffect, useMemo } from "react";
import NoticeCard from "./NoticeCard";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";


const NoticePage = () => {
  const { t } = useTranslation();
  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/json/notice.json")
      .then((res) => res.json())
      .then(setNotices)
      .catch(console.error);
  }, []);

  const today = new Date();

  const activeNotices = useMemo(() => {
    return notices.filter((n) => {
      if (n.status !== "active") return false;

      if (n.expiryDate) return new Date(n.expiryDate) >= today;
      if (n.eventDate) return new Date(n.eventDate) >= today;

      return true;
    });
  }, [notices]);

  const importantNotices = useMemo(
    () => activeNotices.filter((n) => n.isImportant),
    [activeNotices]
  );

  const regularNotices = useMemo(
    () => activeNotices.filter((n) => !n.isImportant),
    [activeNotices]
  );

  const filteredRegular = useMemo(() => {
    if (filter === "all") return regularNotices;
    return regularNotices.filter((n) => n.category === filter);
  }, [filter, regularNotices]);

  const noticeTypes = ["all", "event", "religious", "meeting", "announcement"];

  return (
    <div className="  relative">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
      <div className="custom-container">
        <PageHeading section="notice" />



        <div className="">
          {/* Important Notices */}
          {importantNotices.length > 0 && (
            <div className="mb-10 -mt-5">
              <h3 className="text-xl font-semibold mb-5 text-red-600">
                {t("important_notice")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {importantNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {noticeTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full shadow-lg capitalize transition-all duration-300 cursor-pointer
                  ${filter === type
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-indigo-100"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Regular Notices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
            {filteredRegular.length > 0 ? (
              filteredRegular.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10 col-span-full">
                {t("no_notice")}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NoticePage;