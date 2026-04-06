import api from "../utils/api";

export const getNotices = async () => {
  const res = await api.get("/notices");
  return res.data;
};

export const createNotice = async (data) => {
  const res = await api.post("/notices", data);
  return res.data; // ✅ return the created notice
};

export const updateNotice = async (id, data) => {
  const res = await api.put(`/notices/${id}`, data);
  return res.data; // ✅ return updated notice
};

export const deleteNotice = async (id) => {
  const res = await api.delete(`/notices/${id}`);
  return res.data;
};