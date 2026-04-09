import api from "../utils/api";

const BASE = "/gallery";

export const fetchGallery = async () => {
  const res = await api.get(BASE);
  return res.data.data;
};

export const createGallery = async (formData) => {
  const res = await api.post(BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateGallery = async (id, formData) => {
  const res = await api.put(`${BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteGallery = async (id) => {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data;
};