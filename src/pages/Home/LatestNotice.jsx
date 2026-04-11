import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import SectionHeading from "../../shared/SectionHeading";
import { useTranslation } from "react-i18next";

import PreviewModal from "../NoticePage/PreviewModal";
import NoticeCard from "../NoticePage/NoticeCard";
import useNotices from "../../hooks/useNotices";
import DataNotFound from "../../components/resuable/DataNotFound";

const LatestNotice = () => {
  const { t } = useTranslation();
  const { notices } = useNotices();
  const [previewNotice, setPreviewNotice] = useState(null);

  const activeNotices = notices.filter((n) => n?.active === true) || [];

  return (
    <div className="">
      <div className="custom-container">
        {/* Section Heading */}
        <SectionHeading
          title={t("latest_notices")}
          pathname={t("view_all")}
          path={"/notices"}
          textcolor={"text-black"}
        />

        {!notices.length > 0? (
          <DataNotFound name={"notices"} />
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              500: { slidesPerView: 1, spaceBetween: 12 },
              765: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="rounded-md h-full"
          >
            {activeNotices.map((notice) => (
              <SwiperSlide key={notice._id} className="my-4 h-auto! flex">
                <NoticeCard
                  notice={notice}
                  onPreview={(n) => setPreviewNotice(n)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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

export default LatestNotice;
