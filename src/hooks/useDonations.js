import { useQuery } from "@tanstack/react-query";
import { getDonationsService } from "../services/donationService";

const useDonations = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: getDonationsService,
  });
};

export default useDonations;