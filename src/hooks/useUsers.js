import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export default useUsers;