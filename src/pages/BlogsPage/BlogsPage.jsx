import { useEffect, useState } from "react";
import PageHeading from "../../shared/PageHeading";
import BlogCard from "../../components/BlogCard"; 
import { useData } from "../../context/useData";

const BlogsPage = () => {
  const {blogs, setBlogs} = useData();

  return (
    <section id="blogs" className="relative min-h-screen">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
      <div className="custom-container">
        <PageHeading section="blogs" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-5 ">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
