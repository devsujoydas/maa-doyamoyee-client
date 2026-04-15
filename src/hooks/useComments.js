import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, fetchComments } from "../services/commentService";

const useComments = () => {
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });

  return {
    comments,
    isLoading,
    deleteComment: deleteMutation.mutateAsync,
  };
};

export default useComments;
