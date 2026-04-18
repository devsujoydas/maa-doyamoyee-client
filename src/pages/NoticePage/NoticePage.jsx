import { useState } from "react";
import PageHeading from "../../shared/PageHeading";
import { useTranslation } from "react-i18next";

import PreviewModal from "./PreviewModal";
import NoticeCard from "./NoticeCard";
import useNotices from "../../hooks/useNotices";
import DataNotFound from "../../components/resuable/DataNotFound";
import SEO from "../../components/SEO";

const NoticePage = () => {
  const { t } = useTranslation();
  const { notices, isLoading } = useNotices();
  const [previewNotice, setPreviewNotice] = useState(null);

  // Filter active notices
  const activeNotices = notices?.filter((n) => n.active === true) || [];

  return (
    <div className="relative min-h-[50vh]">
      <SEO
        title="Temple Notices | Maa Doyamoyee Temple"
        description="Stay updated with all official notices, announcements and temple updates."
        url="https://www.maa-doyamoyee.com/notices"
        keywords="temple notice, announcement, Maa Doyamoyee notice, বিজ্ঞপ্তি"
      />
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
           <div className="absolute hidden xl:block bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>



      <div className="custom-container">
        <PageHeading section="notice" />

        {/* Notices Grid */}
        {!notices.length > 0 ? (
          <DataNotFound name={"notices"} isLoading={isLoading} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {activeNotices.length > 0 &&
              activeNotices.map((notice) => (
                <NoticeCard
                  key={notice._id}
                  notice={notice}
                  onPreview={(n) => setPreviewNotice(n)}
                />
              ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        selected={previewNotice}
        isOpen={!!previewNotice}
        onClose={() => setPreviewNotice(null)}
      />
    </div>
  );
};

export default NoticePage;
