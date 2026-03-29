import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const BlogPostCard = ({ blog, profile }) => {
  const { t } = useTranslation();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='blog-image']", {});
    return () => Fancybox.unbind("[data-fancybox='blog-image']");
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6  lang-bn-BD">
      {/* Title */}
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 text-gray-900 ">
        {blog?.title}
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center text-gray-500 text-xs sm:text-sm md:text-base gap-3 sm:gap-4 mb-5">
        <span>
          👁️ {blog?.views?.length || 0} {t("views")}
        </span>
        <span>
          💬 {blog?.comments?.length || 0} {t("comments")}
        </span>
        <span>📅 {formatDateDynamic(blog?.createdAt)}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-5">
        {profile == "true" ? blog.desc.slice(0, 200) + "..." : blog?.desc}
      </p>

      {/* Blog Image */}
      <a
        href={blog?.postImg }
        data-fancybox="blog-image"
        data-caption={blog?.title}
      >
        <img loading="lazy"
          src={blog?.postImg }
          alt={blog?.title}
          className="w-full h-auto mb-5 rounded-xl object-cover transition-transform duration-300"
        />
      </a>
    </div>
  );
};

export default BlogPostCard;
