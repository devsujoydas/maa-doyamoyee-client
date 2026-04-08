import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEventsService,
  createEventService,
  updateEventService,
  deleteEventService,
} from "../services/eventService";

const useEvents = () => {
  const queryClient = useQueryClient();

  // get all events
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: getEventsService,
    staleTime: 1000 * 60,
  });

  // add event
  const addEvent = useMutation({
    mutationFn: createEventService,
    onSuccess: () => queryClient.invalidateQueries(["events"]),
  });

  // edit event
  const editEvent = useMutation({
    mutationFn: ({ id, formData }) => updateEventService(id, formData),
    onSuccess: () => queryClient.invalidateQueries(["events"]),
  });

  // delete event
  const deleteEvent = useMutation({
    mutationFn: deleteEventService,
    onSuccess: () => queryClient.invalidateQueries(["events"]),
  });

  return {
    events: data?.events || [],
    total: data?.total || 0,
    addEvent,
    editEvent,
    deleteEvent,
  };
};

export default useEvents;