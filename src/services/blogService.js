import api from "../utils/api";

export const fetchBlogs = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createBlog = async (formData) => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBlog = async (id, formData) => {
  const res = await api.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateStatus = async ({ id, status }) => {
  // Backend expects PATCH
  const res = await api.patch(`/admin/post/${id}/status`, { status });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};