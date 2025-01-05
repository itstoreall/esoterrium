import { useQuery } from '@tanstack/react-query';
import api from '@/src/lib/axios/client';

// const fetchLatestArticle = async (params?: {
//   isPublished?: boolean;
//   access?: string;
// }) => {
//   const query = new URLSearchParams(
//     params as Record<string, string>
//   ).toString();
//   const response = await fetch(`/api/articles/latest?${query}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch the latest article');
//   }
//   return response.json();
// };

const useLatestArticle = () => {
  // const query = new URLSearchParams(
  //   params as Record<string, string>
  // ).toString();

  console.log(33);

  return useQuery({
    queryKey: ['latestArticle'],
    queryFn: async () => {
      console.log(333);
      const response = await api.get('/articles/latest');
      console.log('response:', response);
      return response.data;
    },
  });

  // return useQuery(['latestArticle', params], () => fetchLatestArticle(params));
};

export default useLatestArticle;
