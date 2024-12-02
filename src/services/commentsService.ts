
import apiClient from '@/src/lib/axios/client';

export const getComments = async (articleId: string) => {
  return apiClient.get(`/articles/${articleId}/comments`);
};

export const addComment = async (
  articleId: string,
  commentData: { userName: string; message: string }
) => {
  return apiClient.post(`/articles/${articleId}/comments`, commentData);
};

export const updateComment = async (
  articleId: string,
  updateData: { commentId: string; message: string }
) => {
  return apiClient.put(`/articles/${articleId}/comments`, updateData);
};

export const deleteComment = async (articleId: string, commentId: string) => {
  return apiClient.delete(`/articles/${articleId}/comments`, {
    data: { commentId },
  });
};
