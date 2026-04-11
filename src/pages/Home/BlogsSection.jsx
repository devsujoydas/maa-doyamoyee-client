import BlogCard from "../../components/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SectionHeading from "../../shared/SectionHeading";
import { useTranslation } from "react-i18next";
import useBlogs from "../../hooks/useBlogs";
import DataNotFound from "../../components/resuable/DataNotFound";

const BlogsSection = () => {
  const { t } = useTranslation();
  const { blogs = [],isLoading } = useBlogs();

  // ✅ FIXED typo
  const approvedBlogs = blogs.filter((b) => b.status === "approved");

  return (
    <section id="blogs" className="w-full bg-section-secondary">
      <div className="custom-container">
        <SectionHeading
          title={t("blogs")}
          pathname={t("view_all")}
          path={"/blogs"}
          textcolor={"text-black"}
        />

        <div className="mt-10">
          {!approvedBlogs.length > 0 ? (
            <DataNotFound name={"blogs"} isLoading={isLoading} />
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={approvedBlogs.length > 3}
              breakpoints={{
                500: { slidesPerView: 1, spaceBetween: 10 },
                765: { slidesPerView: 2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
              }}
              className="rounded-md"
            >
              {approvedBlogs.map((blog, idx) => (
                <SwiperSlide key={idx} className="py-3">
                  <BlogCard type={"blog-section"} blog={blog} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
