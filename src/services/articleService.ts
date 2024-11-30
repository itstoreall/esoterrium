import api from '@/src/lib/axios/client';

type Article = {
  _id?: string;
  idx?: number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  views?: number;
  tags?: string[];
  comments?: string[];
  isPublished?: boolean;
};

export const createArticle = async (data: Article) => {
  const response = await api.post('/articles', data);
  return response.data;
};

export const updateArticle = async (id: string, data: Article) => {
  const response = await api.put(`/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
