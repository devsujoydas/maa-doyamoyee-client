import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as service from "../services/messageService";

const useMessages = (params) => {
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["messages", params],
    queryFn: () => service.fetchMessages(params),
  });

  const markRead = useMutation({
    mutationFn: service.markRead,
    onSuccess: () => qc.invalidateQueries(["messages"]),
  });

  const deleteMsg = useMutation({
    mutationFn: service.deleteMessage,
    onSuccess: () => qc.invalidateQueries(["messages"]),
  });

  const reply = useMutation({
    mutationFn: ({ id, message }) =>
      service.sendReply(id, message),
    onSuccess: () => qc.invalidateQueries(["messages"]),
  });

  return {
    messages: data,
    isLoading,
    markRead: markRead.mutateAsync,
    deleteMsg: deleteMsg.mutateAsync,
    reply: reply.mutateAsync,
  };
};

export default useMessages;