import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as service from "../services/galleryService";

const useGallery = () => {
  const queryClient = useQueryClient();

  const { data: gallery = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: service.fetchGallery,
  });

  const createOrUpdate = useMutation({
    mutationFn: async ({ id, formData }) => {
      if (id) return service.updateGallery(id, formData);
      return service.createGallery(formData);
    },
    onSuccess: (_, variables) => {
      toast.success(variables.id ? "Updated successfully" : "Created successfully");
      queryClient.invalidateQueries(["gallery"]);
    },
    onError: () => toast.error("Something went wrong"),
  });

  const deleteMutation = useMutation({
    mutationFn: service.deleteGallery,
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries(["gallery"]);
    },
    onError: () => toast.error("Delete failed"),
  });

  return {
    gallery,
    isLoading,
    createOrUpdate,
    deleteGallery: deleteMutation.mutateAsync,
    isSubmitting: createOrUpdate.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useGallery;