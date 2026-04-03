import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const BlogPostComment = ({ comment }) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='comment-author']", {});
    return () => Fancybox.unbind("[data-fancybox='comment-author']");
  }, []);
 

  if (!comment?.author) return null;

  return (
    <div className="flex gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-md border border-gray-100 mb-4  lang-bn-BD">
      
      {/* Author Photo */}
      <div className="w-16 h-16 rounded-full border border-zinc-100 overflow-hidden shadow-inner shrink-0">
        {comment.author.profileImage && (
          <a
            href={comment?.author?.profileImage}
            data-fancybox="comment-author"
            data-caption={comment?.author?.name}
          >
            <img loading="lazy"
              src={comment.author.profileImage}
              alt={comment?.author?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </a>
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
            {comment?.author?.name}
          </h4>
          <span className="text-gray-400 text-xs sm:text-sm">{formatDateDynamic(comment?.createdAt)}</span>
        </div>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{comment.text}</p>
      </div>
    </div>
  );
};

export default BlogPostComment;