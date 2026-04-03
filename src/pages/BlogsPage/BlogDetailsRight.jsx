import { useEffect, useMemo } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGlobe,
  FaGithub,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const BlogDetailsRight = ({ blog, recentPosts = [] }) => {
  const { t } = useTranslation(); 

  
  useEffect(() => {
    Fancybox.bind("[data-fancybox='author-image']", {});
    return () => Fancybox.unbind("[data-fancybox='author-image']");
  }, []);

  const randomPosts = useMemo(() => {
    const filtered = recentPosts.filter((post) => post._id !== blog._id);
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPosts, blog.id]);

  return (
    <div className="w-full lg:w-1/3 space-y-8 rounded-xl">
      {/* Author Card */}
      {blog?.author && (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center  lang-bn-BD">
          {blog.author.profileImage && (
            <a
              href={blog.author.profileImage}
              data-fancybox="author-image"
              data-caption="Author"
            >
              <img
                loading="lazy"
                src={blog.author.profileImage}
                alt={blog.author.name}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-3 sm:mb-4"
              />
            </a>
          )}
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900">
            {blog.author.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-1">
            @{blog.author.username}
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
            {blog.author.bio}
          </p>

          <div className="mt-4 w-full flex items-center gap-3 justify-center ">
            {blog?.author?.contactDetails &&
              Object.entries(blog?.author?.contactDetails)
                .filter(([_, val]) => val)
                .map(([key, value]) => {
                  let Icon, colorClass;
                  switch (key) {
                    case "facebook":
                      Icon = FaFacebook;
                      colorClass = "hover:text-blue-600";
                      break;
                    case "instagram":
                      Icon = FaInstagram;
                      colorClass = "hover:text-pink-500";
                      break;
                    case "youtube":
                      Icon = FaYoutube;
                      colorClass = "hover:text-red-600";
                      break;
                    case "website":
                      Icon = FaGlobe;
                      colorClass = "hover:text-green-600";
                      break;
                    case "github":
                      Icon = FaGithub;
                      colorClass = "hover:text-gray-800";
                      break;
                    default:
                      Icon = FaGlobe;
                      colorClass = "hover:text-gray-600";
                  }
                  return (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 text-gray-600 ${colorClass} transition text-sm`}
                    >
                      <Icon className="text-xl" />
                    </a>
                  );
                })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
          {t("search")}
        </h3>
        <div className="flex ">
          <input
            type="text"
            placeholder={t("search_placeholder")}
            className="border border-gray-300 rounded-l-xl p-2 sm:p-3 w-full text-sm sm:text-base focus:ring-2 focus:ring-[#7E4555] focus:outline-none"
          />
          <button className="bg-[#7E4555] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-r-xl hover:bg-[#B5697E] text-sm sm:text-base cursor-pointer active:scale-95 transition-all">
            {t("search")}
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
          {t("recent_posts")}
        </h3>
        <div className="space-y-3 sm:space-y-4  lang-bn-BD">
          {randomPosts.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 sm:gap-4 items-center pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <Link to={`/blogs/${post._id}`}>
                <img
                  loading="lazy"
                  src={post.postImg}
                  alt={post.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
              </Link>
              <div className="flex flex-col">
                <Link to={`/blogs/${post._id}`}>
                  <h4 className="text-gray-800 hover:text-red-500 font-semibold text-xs sm:text-base">
                    {post.title}
                  </h4>
                </Link>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {formatDateDynamic(post?.createdAt)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsRight;
