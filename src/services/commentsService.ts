import apiClient from '@/src/lib/axios/client';
import { CommentData } from '@/src/types';

type CreatePayload = Pick<
  CommentData,
  'articleId' | 'userId' | 'userName' | 'message'
>;

type UpdatePayload = Omit<CreatePayload, 'userName' | 'userId'> & {
  commentId: string;
};

type DeletePayload = Omit<UpdatePayload, 'message'>;

export const getComments = async (articleId: string) => {
  return apiClient.get(`/comments/${articleId}`);
};

export const createComment = async (payload: CreatePayload) => {
  return apiClient.post(`/comments/${payload.articleId}`, payload);
};

export const updateComment = async (payload: UpdatePayload) => {
  return apiClient.put(`/comments/${payload.articleId}`, {
    commentId: payload.commentId,
    message: payload.message,
  });
};

export const deleteComment = async (payload: DeletePayload) => {
  return apiClient.delete(
    `/comments/${payload.articleId}/${payload.commentId}`
  );
};
