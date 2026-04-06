import axios from "axios";

export const getEvents = async () => {
  const res = await axios.get("/json/events.json");
  return res.data;
};