import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as donationService from "../services/donationService";

const useDonationActions = () => {
  const queryClient = useQueryClient();

  // CREATE
  const createMutation = useMutation({
    mutationFn: donationService.createDonation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: donationService.deleteDonation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  // STATUS UPDATE
  const statusMutation = useMutation({
    mutationFn: donationService.updateDonationStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  return {
    createDonation: createMutation.mutateAsync,
    deleteDonation: deleteMutation.mutateAsync,
    updateStatus: statusMutation.mutateAsync,
  

    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdatingStatus: statusMutation.isPending,
  };
};

export default useDonationActions;