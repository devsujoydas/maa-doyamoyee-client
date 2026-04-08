// src/services/galleryService.js
import api from "../utils/api";

// GET all galleries
export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data.data;
};

// CREATE gallery
export const createGallery = async (formData) => {
  const res = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// UPDATE gallery
export const updateGallery = async ({ id, formData }) => {
  const res = await api.put(`/gallery/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// DELETE gallery
export const deleteGallery = async (id) => {
  const res = await api.delete(`/gallery/${id}`);
  return res.data;
};