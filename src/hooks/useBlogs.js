import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as blogService from "../services/blogService";

const useBlogs = () => {
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.fetchBlogs,
  });

  const createOrUpdate = useMutation({
    mutationFn: async ({ id, formData }) => {
      if (id) return blogService.updateBlog(id, formData);
      return blogService.createBlog(formData);
    },
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });

  const updateStatusMutation = useMutation({
    mutationFn: blogService.updateStatus,
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });

  return {
    blogs,
    isLoading,
    createOrUpdate,
    updateStatus: updateStatusMutation.mutateAsync,
    deleteBlog: deleteMutation.mutateAsync,
  };
};

export default useBlogs;