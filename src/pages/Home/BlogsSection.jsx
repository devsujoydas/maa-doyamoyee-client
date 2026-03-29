import BlogCard from "../../components/BlogCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from "react";
import SectionHeading from "../../shared/SectionHeading";
import { useTranslation } from "react-i18next";


const BlogsSection = () => {
    const { t } = useTranslation();
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    fetch("/json/blogs.json")
      .then((res) => res.json())
      .then(setBlogsData)
      .catch(console.error);
  }, []);

  return (
    <section id="blogs" className="relative  w-full bg-section-secondary " >

      <div className="custom-container">

        <SectionHeading
          title={t("blogs")}
          pathname={t("view_all")}
          path={"/blogs"}
          textcolor={"text-black"}
        />


        <div className="mt-10 ">
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
            {blogsData.map((blog, idx) => (
              <SwiperSlide key={idx}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section >
  );
};

export default BlogsSection