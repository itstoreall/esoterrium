'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import normalizeString from '@/src/utils/normalizeString';
import EditCommentForm from '@/src/components/Comments/EditCommentForm';
import convertDate from '@/src/utils/convertDate';
import Button from '../Button/Button';
import useUserRole from '@/src/hooks/useUserRole';

type Props = {
  userId: string;
  articleId: string;
  comments: CommentData[];
};

const config = {
  confirmMsg: 'Эта комментарий будет удален!',
  alertSuccess: '',
  alertError: 'Error deleting comment:',
};

const CommentList = ({ userId, articleId, comments }: Props) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const acc = useUserRole();

  const queryClient = useQueryClient();

  const handleDeleteClick = async (commentId: string) => {
    if (!confirm(config.confirmMsg)) return;

    try {
      const res = await deleteComment({ articleId, commentId });
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    } catch (err) {
      console.error(config.alertError, err);
    }
  };

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  console.log('acc.isAdminRole()', acc);

  return (
    <ul className="article-details-comment-list">
      {comments.map((comment: CommentData, idx: number) => (
        <li key={idx} className="article-details-comment-list-item">
          {idx > 0 && (
            <span className="article-details-comment-list-item-divider" />
          )}

          <div className="article-details-comment-list-item-content">
            <div className="article-details-comment-list-item-content-heading">
              <span className="article-details-comment-list-item-content-username">
                {comment.userName}
              </span>

              <span className="article-details-comment-list-item-content-date">
                {convertDate(comment.createdAt)}
              </span>
            </div>

            {editingCommentId === comment._id ? (
              <EditCommentForm
                className={'article-details-comment-list-item-edit-form'}
                articleId={articleId}
                comment={comment}
                onCancel={handleCancelEdit}
              />
            ) : (
              <p>{normalizeString(comment.message, 25, 15, 5)}</p>
            )}

            {editingCommentId !== comment._id &&
              (userId === comment.userId || acc.isAdminRole()) && (
                <div className="article-details-comment-list-item-content-button-block">
                  <Button
                    className="small-button"
                    clickContent={() => handleEditClick(comment._id)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    className="small-button"
                    clickContent={() => handleDeleteClick(comment._id)}
                  >
                    Удалить
                  </Button>
                </div>
              )}
          </div>

          {/* {editingCommentId === comment._id ? (
            <EditCommentForm
              className={'article-details-comment-list-item-edit-form'}
              articleId={articleId}
              comment={comment}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="article-details-comment-list-item-content">
              <p className="article-details-comment-list-item-content-message">
                <span className="article-details-comment-list-item-content-message-username">
                  {comment.userName}
                </span>
                <span className="article-details-comment-list-item-content-message-date">
                  {convertDate(comment.createdAt)}
                </span>
                <span className="article-details-comment-list-item-content-message-text">
                  {normalizeString(comment.message, 25, 15, 5)}
                </span>
              </p>

              <div>
                <Button
                  className="small-button"
                  clickContent={() => handleEditClick(comment._id)}
                >
                  Редактировать
                </Button>
                <Button
                  className="small-button"
                  clickContent={() => handleDeleteClick(comment._id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          )} */}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
