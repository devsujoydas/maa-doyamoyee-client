import api from "../utils/api";

// Fetch all notices
export const fetchNotices = async () => {
  const res = await api.get("/notices");
  return res.data;
};

// Create notice
export const createNotice = async (data) => {
  const res = await api.post("/notices", data);
  return res.data;
};

// Update notice
export const updateNotice = async (id, data) => {
  const res = await api.put(`/notices/${id}`, data);
  return res.data;
};

// Delete notice
export const deleteNotice = async (id) => {
  await api.delete(`/notices/${id}`);
  return id;
};