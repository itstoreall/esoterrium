import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentData } from '@/src/types';
import { getComments } from '@/src/services/commentsService';
import { useState } from 'react';

export type CommentRes = { data: CommentData[] };

export const useComments = (articleId: string) => {
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const queryClient = useQueryClient();

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

  const refetch = () => {
    const currentTime = Date.now();

    if (!lastFetchTime || currentTime - lastFetchTime >= 30000) {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setLastFetchTime(currentTime);
    } else {
      console.log('Refetching is disabled: Please wait for a minute.');
    }
  };

  return { data, error, isLoading, isSuccess, refetch };
};
