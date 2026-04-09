import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as donationService from "../services/donationService";

const useDonations = () => {
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: donationService.getAllDonations,
  });

  const createMutation = useMutation({
    mutationFn: donationService.createDonation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: donationService.deleteDonation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  const statusMutation = useMutation({
    mutationFn: donationService.updateDonationStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["donations"] }),
  });

  return {
    donations,
    isLoading,
    isCreating: createMutation.isLoading,
    createDonation: createMutation.mutateAsync,
    deleteDonation: deleteMutation.mutateAsync,
    updateStatus: statusMutation.mutateAsync,
  };
};

export default useDonations;