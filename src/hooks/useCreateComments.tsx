import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/src/services/commentsService';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['createComment'],
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      console.log('Comment created successfully!');
    },
    onError: (err) => console.error('ERROR in useCreateComment:', err),
  });

  return { createComment: mutate, isPending };
};
