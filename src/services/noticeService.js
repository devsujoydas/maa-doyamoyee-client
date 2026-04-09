import api from "../utils/api";

export const fetchNotices = async () => {
  const res = await api.get("/notices");
  return res.data;
};

export const createNotice = async (formData) => {
  const res = await api.post("/notices", formData);
  return res.data;
};

export const updateNotice = async (id, formData) => {
  const res = await api.put(`/notices/${id}`, formData);
  return res.data;
};

export const deleteNotice = async (id) => {
  await api.delete(`/notices/${id}`);
  return id;
};

export const togglePin = async (id) => {
  const res = await api.patch(`/notices/${id}/toggle-pin`);
  return res.data;
};

export const toggleStatus = async (id) => {
  const res = await api.patch(`/notices/${id}/toggle-status`);
  return res.data;
};