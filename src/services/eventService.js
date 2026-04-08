import api from "../utils/api";

// GET all events
export const getEventsService = async () => {
  const res = await api.get("/events");
  return res.data;
};

// CREATE event
export const createEventService = async (formData) => {
  const res = await api.post("/events", formData);
  return res.data;
};

// UPDATE event
export const updateEventService = async (id, formData) => {
  const res = await api.put(`/events/${id}`, formData);
  return res.data;
};

// DELETE event
export const deleteEventService = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};