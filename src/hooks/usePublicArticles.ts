import { useQuery } from '@tanstack/react-query';
import api from '@/src/lib/axios/client';

export const usePublicArticles = () => {
  return useQuery({
    queryKey: ['publicArticles'],
    queryFn: async () => {
      const params = { params: { isPublished: true, access: 'public' } };
      const response = await api.get('/articles', params);
      return response.data;
    },
  });
};
