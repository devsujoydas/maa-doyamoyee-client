import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../services/messageService";

const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
};

export default useMessages;