import { useState, useEffect } from "react";
import BlogDetailsLeft from "./BlogDetailsLeft";
import BlogDetailsRight from "./BlogDetailsRight";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import api from "../../utils/api";
import toast from "react-hot-toast";
import { useData } from "../../context/useData";

const BlogsDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs } = useData();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [blogRes, commentRes] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/posts/${id}/comments`),
        ]);

        setBlog(blogRes.data);
        setComments(commentRes.data);
 
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="bg-white">
      <div className="container xl:mx-auto px-3 md:px-0 md:py-10">
        <button
          onClick={() => navigate("/blogs")}
          className="inline-block cursor-pointer md:mb-6 mb-5 md:mt-0 mt-8 text-indigo-600 hover:underline"
        >
          ← {t("back_to_all_posts")}
        </button>

        <div className="flex md:flex-row flex-col gap-5">
          <BlogDetailsLeft blog={blog} comments={comments} setComments={setComments}/>
          <BlogDetailsRight blog={blog} recentPosts={blogs} />
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
