import  { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination' 
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from "react";
import NoticeCard from '../NoticePage/NoticeCard';
import SectionHeading from '../../shared/SectionHeading';
import { useTranslation } from "react-i18next";

const LatestNotice = () => {
    const { t } = useTranslation();
  const [notices, setNotices] = useState([]);

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


  return (
    <div className=''>
      <div className='custom-container'>


        <SectionHeading
          title={t("latest_notices")}
          pathname={t("view_all")}
          path={"/notices"}
          textcolor={"text-black"}
        />


        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            500: { slidesPerView: 1, spaceBetween: 10 },
            765: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
          }}

          className=" rounded-md "
        >
          {importantNotices.map((notice, idx) => (
            <SwiperSlide key={idx}>
              <NoticeCard key={notice.id} notice={notice} />
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </div>
  )
}

export default LatestNotice