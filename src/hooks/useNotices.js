import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as noticeService from "../services/noticeService";

const useNotices = () => {
  const queryClient = useQueryClient();

  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.getNotices,
  });

  const createOrUpdate = useMutation({
    mutationFn: async ({ id, data }) => {
      if (id) return noticeService.updateNotice(id, data);
      return noticeService.createNotice(data);
    },
    onSuccess: () => queryClient.invalidateQueries(["notices"]),
  });

  const deleteMutation = useMutation({
    mutationFn: noticeService.deleteNotice,
    onSuccess: () => queryClient.invalidateQueries(["notices"]),
  });

  return {
    notices,
    isLoading,
    createOrUpdate,
    deleteNotice: deleteMutation.mutateAsync,
  };
};

export default useNotices;