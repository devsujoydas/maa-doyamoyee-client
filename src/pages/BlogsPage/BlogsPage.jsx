import { useEffect, useState } from "react";
import PageHeading from "../../shared/PageHeading";
import BlogCard from "../../components/BlogCard";
import useBlogs from "../../hooks/useBlogs";
import { useTranslation } from "react-i18next";
import DataNotFound from "../../components/resuable/DataNotFound";

const BlogsPage = () => {
  const { blogs = [], isLoading } = useBlogs();
  const { t } = useTranslation();

  const approvedBlogs = blogs.filter((b) => b.status === "approved");

  return (
    <section id="blogs" className="relative ">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="blogs" />

        {approvedBlogs.length === 0 ? (
          <DataNotFound name={"blogs"} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 ">
            {approvedBlogs.map((blog, idx) => (
              <BlogCard type={"blog-page"} key={idx} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsPage;
