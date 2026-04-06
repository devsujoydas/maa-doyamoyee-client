import axios from "axios";

export const getMessages = async () => {
  const res = await axios.get("/json/messages.json");
  return res.data;
};