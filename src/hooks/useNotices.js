import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as noticeService from "../services/noticeService";

const useNotices = () => {
  const queryClient = useQueryClient();

  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: noticeService.fetchNotices,
  });

  const createOrUpdate = useMutation({
    mutationFn: async ({ id, formData }) => {
      if (id) return noticeService.updateNotice(id, formData);
      return noticeService.createNotice(formData);
    },
    onSuccess: () => queryClient.invalidateQueries(["notices"]),
  });

  const togglePinMutation = useMutation({
    mutationFn: noticeService.togglePin,
    onSuccess: (updatedNotice) => {
      queryClient.setQueryData(["notices"], (old = []) =>
        old.map((n) => (n._id === updatedNotice._id ? updatedNotice : n))
      );
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: noticeService.toggleStatus, 
    onSuccess: (updatedNotice) => {
      queryClient.setQueryData(["notices"], (old = []) =>
        old.map((n) => (n._id === updatedNotice._id ? updatedNotice : n))
      );
    }, 
  });

  const deleteMutation = useMutation({
    mutationFn: noticeService.deleteNotice,
    onSuccess: (id) => {
      queryClient.setQueryData(["notices"], (old = []) => old.filter((n) => n._id !== id));
    },
  });

  return {
    notices,
    isLoading,
    createOrUpdate,
    togglePin: togglePinMutation.mutateAsync,
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteNotice: deleteMutation.mutateAsync,
  };
};

export default useNotices;