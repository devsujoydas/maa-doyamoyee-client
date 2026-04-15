import api from "../utils/api";

export const fetchComments = async () => {
  const res = await api.get("/posts/comments");
  return res.data;
};

export const deleteComment = async (postId, commentId) => {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
};
