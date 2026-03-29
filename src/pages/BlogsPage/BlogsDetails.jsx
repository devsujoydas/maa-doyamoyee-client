import { useState, useEffect } from "react";
import BlogDetailsLeft from "./BlogDetailsLeft";
import BlogDetailsRight from "./BlogDetailsRight";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogsDetails = () => {
   const { t } = useTranslation();

  const navigate = useNavigate();
  const { slug } = useParams();
  const [blogsData, setBlogsData] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);


  useEffect(() => {
    fetch("/json/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogsData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (blogsData.length && slug) {
      const found = blogsData.find((b) => b.slug === slug);
      setCurrentBlog(found || blogsData[0]); 
    }
  }, [blogsData, slug]);

  if (!currentBlog) return null; 

  return (
    <div className="bg-white ">
     

      <div className="container xl:mx-auto px-3 md:px-0 md:py-10 ">
        <button
          onClick={() => navigate("/blogs")}
          className="inline-block cursor-pointer md:mb-6 mb-5 md:mt-0 mt-8 text-indigo-600 hover:underline  lang-bn-BD"
        >
          ← {t("back_to_all_posts")}
        </button>
        <div className="flex md:flex-row flex-col gap-5">
          <BlogDetailsLeft blog={currentBlog} />
          <BlogDetailsRight
            blog={currentBlog}
            recentPosts={blogsData}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;