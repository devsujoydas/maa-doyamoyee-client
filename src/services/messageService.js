import api from "../utils/api";

export const fetchMessages = async (params) => {
  const res = await api.get("/messages", { params });
  return res.data.messages;
};

export const createMessage = (data) => api.post("/messages", data);
export const markRead = (id) => api.patch(`/messages/${id}/read`);
export const markUnread = (id) => api.patch(`/messages/${id}/unread`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
export const sendReply = (id, message) => api.post(`/messages/${id}/reply`, { message });
