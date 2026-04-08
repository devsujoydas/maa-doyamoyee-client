import api from "../utils/api";

// recursive formdata builder (VERY IMPORTANT)
const appendFormData = (formData, data, parentKey = "") => {
  for (let key in data) {
    const value = data[key];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (typeof value === "object" && value !== null) {
      appendFormData(formData, value, formKey);
    } else if (value !== undefined && value !== null) {
      formData.append(formKey, value);
    }
  }
};

// CREATE
export const createDonationService = async (payload) => {
  const formData = new FormData();
  appendFormData(formData, payload);

  const res = await api.post("/donation", formData);
  return res.data;
};

// GET ALL
export const getDonationsService = async () => {
  const res = await api.get("/donation");
  return res.data.donations;
};

// DELETE
export const deleteDonationService = async (id) => {
  const res = await api.delete(`/donation/${id}`);
  return res.data;
};