import { useQuery } from '@tanstack/react-query';
import { CommentData } from '@/src/types';
import { getComments } from '@/src/services/commentsService';

export type CommentRes = { data: CommentData[] };

export const useComments = (articleId: string) => {
  const modifyData = (res: CommentRes) => res.data;

  const {
    data,
    error,
    isLoading,
    isSuccess,
    /*
    isStale, refetch
    */
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(articleId),
    select: modifyData,
    enabled: true,
    /*
    initialData,
    staleTime: 5000
    */
  });

  return { data, error, isLoading, isSuccess };
};
