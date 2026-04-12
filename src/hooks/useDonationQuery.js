import { useQuery } from "@tanstack/react-query";
import * as donationService from "../services/donationService";

const useDonationQuery = () => {
  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: donationService.getAllDonations,
  });

  return {
    donations,
    isLoading,
    isError,
  };
};

export default useDonationQuery;