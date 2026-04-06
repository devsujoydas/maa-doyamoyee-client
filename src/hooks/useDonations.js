import { useQuery } from "@tanstack/react-query";
import { getDonations } from "../services/donationService";

const useDonations = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: getDonations,
  });
};

export default useDonations;