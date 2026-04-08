import api from "../utils/api";

// ✅ GET all posts
export const fetchBlogs = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// ✅ CREATE
export const createBlog = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ UPDATE
export const updateBlog = async (id, formData) => {
  const res = await api.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ STATUS
export const updateStatus = async ({ id, status }) => {
  const res = await api.put(`/posts/post/${id}/status`, { status });
  return res.data;
};

// ✅ DELETE
export const deleteBlog = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};