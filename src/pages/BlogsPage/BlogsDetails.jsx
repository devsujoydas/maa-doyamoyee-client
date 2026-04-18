import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../utils/api";
import toast from "react-hot-toast";
import BlogPostComment from "./BlogPostComment";
import BlogLeaveAComment from "./BlogLeaveAComment";
import BlogPostCard from "./BlogPostCard";
import SEO from "../../components/SEO";
import LoadingSpinner from "../../components/LoadingSpinner";

const BlogsDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

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

  if (loading) return <LoadingSpinner />;

  if (!blog) return null;

  return (
    <div className="bg-white">
      <SEO
        title={`${blog?.title} | Maa Doyamoyee Blog`}
        description={blog?.content}
        url={`https://www.maa-doyamoyee.com/blogs/${blog._id}`}
        image={blog.postImg?.url}
        type="article"
        publishedTime={blog.createdAt}
        updatedTime={blog.updatedAt}
        keywords="spiritual blog, Hindu article, Maa Doyamoyee blog"
      />

      <div className="container xl:mx-auto px-3 md:px-0 md:py-10">
        <button
          onClick={() => navigate("/blogs")}
          className="inline-block cursor-pointer md:mb-6 mb-5 md:mt-0 mt-8 text-indigo-600 hover:underline"
        >
          ← {t("back_to_all_posts")}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* left side */}
          <div className="md:col-span-2">
            <BlogPostCard blog={blog} />
          </div>

          {/* right side */}
          <div className=" md:col-span-1 ">
            <div className="p-3 sm:p-4 bg-white border border-zinc-200 rounded-xl mb-5">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-3 text-gray-900 ">
                {t("comments")}
              </h2>
              <BlogPostComment comments={comments} setComments={setComments} />
            </div>
            <BlogLeaveAComment
              comments={comments}
              setComments={setComments}
              postId={blog._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
