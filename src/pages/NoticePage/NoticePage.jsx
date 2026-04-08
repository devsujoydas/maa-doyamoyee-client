import { useState, useMemo } from "react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";

import PreviewModal from "./PreviewModal";
import NoticeCard from "./NoticeCard";
import useNotices from "../../hooks/useNotices";

const NoticePage = () => {
  const { t } = useTranslation();
  const { notices } = useNotices();
  const [previewNotice, setPreviewNotice] = useState(null);

  const activeNotice = notices.filter((n) => n.status == "active");

  return (
    <div className="relative min-h-[50vh]">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="notice" />

        {/* -------- Notices Grid -------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {activeNotice.length > 0 ? (
            activeNotice.map((notice) => (
              <NoticeCard
                key={notice._id}
                notice={notice}
                onPreview={(n) => setPreviewNotice(n)}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              {t("no_notice")}
            </p>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        selected={previewNotice}
        onClose={() => setPreviewNotice(null)}
      />
    </div>
  );
};

export default NoticePage;
