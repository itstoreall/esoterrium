import axios from 'axios';

export const postComment = async (
  articleId: string,
  commentData: { user: string; message: string }
) => {
  return axios.post(`/api/articles/${articleId}/comments`, commentData);
};

export const updateComment = async (
  articleId: string,
  updateData: { commentId: string; message: string }
) => {
  return axios.put(`/api/articles/${articleId}/comments`, updateData);
};

export const deleteComment = async (articleId: string, commentId: string) => {
  return axios.delete(`/api/articles/${articleId}/comments`, {
    data: { commentId },
  });
};
