import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEventsService,
  createEventService,
  updateEventService,
  deleteEventService,
} from "../services/eventService";

const useEvents = () => {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEventsService,
    staleTime: 1000 * 60,
  });

  // CREATE
  const addEvent = useMutation({
    mutationFn: createEventService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      console.error("Add Event Error:", err);
    },
  });

 
  const editEvent = useMutation({
    mutationFn: ({ id, formData }) =>
      updateEventService(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },

    onError: (err) => {
      console.error("Update Event Error:", err);
    },
  });

  // DELETE
  const deleteEvent = useMutation({
    mutationFn: deleteEventService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      console.error("Delete Event Error:", err);
    },
  });

  return {
    events: data?.events || [],
    total: data?.total || 0,
    isLoading,
    addEvent,
    editEvent,
    deleteEvent,
  };
};

export default useEvents;