import BlogPostCard from "./BlogPostCard";
import BlogPostComment from "./BlogPostComment";
import BlogLeaveAComment from "./BlogLeaveAComment";
import { useTranslation } from "react-i18next";

const BlogDetailsLeft = ({ blog }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full sm:w-full lg:w-2/3 2xl:w-2/3 space-y-8 rounded-xl">

      {/* Blog Post */}
      <BlogPostCard blog={blog} />

      {/* Comments */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-5 text-gray-900">
          {t("comments")}
        </h2>

        {blog?.comments?.length > 0 ? (
          blog.comments.map((comment) => (
            <BlogPostComment key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Leave a Comment */}
      <BlogLeaveAComment />
    </div>
  );
};

export default BlogDetailsLeft;