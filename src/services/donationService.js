import axios from "axios";

export const getDonations = async () => {
  const res = await axios.get("/json/donation.json");
  return res.data;
};