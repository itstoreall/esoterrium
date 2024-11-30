import api from '@/src/lib/axios/client';
import { ArticleData } from '@/src/types';

export const createArticle = async (data: Partial<ArticleData>) => {
  const response = await api.post('/articles', data);
  return response.data;
};

export const updateArticle = async (id: string, data: Partial<ArticleData>) => {
  const response = await api.put(`/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
