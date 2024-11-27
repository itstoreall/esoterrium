import api from '@/src/lib/axios';

export const createArticle = async (data: {
  title: string;
  content: string;
  author: string;
}) => {
  const response = await api.post('/articles', data);
  return response.data;
};

export const updateArticle = async (
  id: string,
  data: { title: string; content: string }
) => {
  const response = await api.put(`/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
