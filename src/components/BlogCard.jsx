import { FaRegCalendarAlt } from "react-icons/fa";
import omSymbolsvg from "/Om_symbol.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../utils/formatDateDynamic";

const BlogCard = ({ blog }) => {
  const { t } = useTranslation();
  return (
    <div className="p-1">
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col lang-bn-BD">
        {/* 🔹 Blog Image */}
        <div className="h-70 w-full overflow-hidden">
          <Link to={`/blogs/${blog?.slug}`}>
            <img loading="lazy" 
              src={blog?.postImg || blog?.images[0]}
              alt={blog?.title}
              className="w-full h-full object-cover transform hover:scale-125 transition duration-500 cursor-pointer"
            />
          </Link>
        </div>

        {/* 🔹 Blog Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-5 mb-3">
            {/* Category / Tag */}
            <div className="flex gap-1 items-center">
              <img loading="lazy"  className="w-3 h-3" src={omSymbolsvg} alt="" />
              <span className="text-[13px] font-semibold text-[#44233B]">
                {blog?.category || blog?.tag}
              </span>
            </div>

            {/* Date */}
            <div className="flex gap-2 items-center">
              <FaRegCalendarAlt className="text-[#DB4242]" size={14} />
              <span className="text-[13px] font-semibold text-[#44233B]">
                {formatDateDynamic(blog?.createdAt)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl hover:text-[#DB4242] cursor-pointer font-bold  mb-2">
            <Link to={`/blogs/${blog?.slug}`}>{blog?.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-[#777777] line-clamp-3 text-[16px] mb-4">
            {blog.desc}
            {/* {blog?.desc.length > 120
              ? blog.desc.slice(0, 200) + "..."
              : blog.desc} */}
          </p>

          {/* Views & Comments */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
            <span>
              👁️ {blog?.views?.length || blog?.views} {t("views")}
            </span>
            <span>
              💬 {blog?.comments?.length} {t("comments")}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center mt-auto gap-3">
            <img loading="lazy"
              src={blog?.author?.image}
              alt={blog?.author?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-[16px] text-gray-600">
              <p>
                by{" "}
                <span className="text-[#DB4242] hover:text-[#44233B] transition-all cursor-pointer font-medium">
                  {blog?.author?.name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
