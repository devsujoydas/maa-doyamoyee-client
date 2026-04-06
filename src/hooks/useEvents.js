import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/eventService";

const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};

export default useEvents;