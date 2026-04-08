import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as noticeService from "../services/noticeService";

const useNotices = () => {
  const queryClient = useQueryClient();

  // Fetch notices
  const { data, isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.fetchNotices,
  });

  console.log(data)
  // Create or update
  const createOrUpdate = useMutation({
    mutationFn: async ({ id, formData }) => {
      if (id) return noticeService.updateNotice(id, formData);
      return noticeService.createNotice(formData);
    },
    onSuccess: () => queryClient.invalidateQueries(["notices"]),
  });

  // Delete
  const deleteNotice = useMutation({
    mutationFn: noticeService.deleteNotice,
    onSuccess: () => queryClient.invalidateQueries(["notices"]),
  });

  return {
    notices: Array.isArray(data) ? data : [], // ensure always array
    isLoading,
    createOrUpdate,
    deleteNotice: deleteNotice.mutateAsync,
  };
};

export default useNotices;