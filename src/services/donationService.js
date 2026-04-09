import api from "../utils/api";

// GET ALL
export const getAllDonations = async () => {
  const res = await api.get("/donation");
  return res.data.donations;
};

// CREATE
export const createDonation = async (data) => {
  const res = await api.post("/donation", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// DELETE
export const deleteDonation = async (id) => {
  const res = await api.delete(`/donation/${id}`);
  return res.data;
};

// STATUS
export const updateDonationStatus = async ({ id, status }) => {
  const res = await api.patch(`/donation/${id}/status`, { status });
  return res.data;
};