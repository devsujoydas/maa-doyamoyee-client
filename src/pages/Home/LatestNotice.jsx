import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules"; 
import SectionHeading from "../../shared/SectionHeading";
import { useTranslation } from "react-i18next";
import PreviewModal from "../NoticePage/PreviewModal"; 
import NoticeCard from "../NoticePage/NoticeCard";

const LatestNotice = () => {
  const { t } = useTranslation();
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Fetch notices
  useEffect(() => {
    fetch("/json/notice.json")
      .then((res) => res.json())
      .then(setNotices)
      .catch(console.error);
  }, []);

  // Filter active notices and sort pinned first, then createdAt desc
  const activeNotices = useMemo(() => {
    return notices
      .filter((n) => n.status === "active")
      .sort((a, b) => {
        // pinned first
        if (b.isPinned && !a.isPinned) return 1;
        if (a.isPinned && !b.isPinned) return -1;
        // then sort by createdAt descending
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [notices]);

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

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            500: { slidesPerView: 1, spaceBetween: 12 },
            765: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="rounded-md "
        >
          {activeNotices.map((notice) => (
            <SwiperSlide key={notice.slug} className="my-4">
              <NoticeCard
                notice={notice}
                onPreview={setSelectedNotice} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        selected={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
};

export default LatestNotice;