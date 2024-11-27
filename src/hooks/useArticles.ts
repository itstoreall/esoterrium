import { useQuery } from '@tanstack/react-query';
import api from '@/src/lib/axios/client';

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await api.get('/articles');
      return response.data;
    },
  });
};
