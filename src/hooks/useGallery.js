// src/hooks/useGallery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGallery, createGallery, updateGallery, deleteGallery } from "../services/galleryService";

export const useGallery = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
    staleTime: 1000 * 60, // 1 min caching
  });
};

export const useCreateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGallery,
    onSuccess: () => queryClient.invalidateQueries(["gallery"]),
  });
};

export const useUpdateGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGallery,
    onSuccess: () => queryClient.invalidateQueries(["gallery"]),
  });
};

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGallery,
    onSuccess: () => queryClient.invalidateQueries(["gallery"]),
  });
};