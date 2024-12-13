'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useUserRole from '@/src/hooks/useUserRole';
import { deleteComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import normalizeString from '@/src/utils/normalizeString';
import EditCommentForm from '@/src/components/Comments/EditCommentForm';
import convertDate from '@/src/utils/convertDate';
import Button from '../Button';

type Props = {
  userId: string;
  articleId: string;
  comments: CommentData[];
  handleRespondTo: (userName: string) => void;
};

const config = {
  confirmMsg: 'Эта комментарий будет удален!',
  alertSuccess: '',
  alertError: 'Error deleting comment:',
};

const CommentList = (props: Props) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const acc = useUserRole();

  const { userId, articleId, comments, handleRespondTo } = props;

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

  const handleRespond = (userName: string) => {
    handleRespondTo(`${userName}, `);
  };

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
                className={'article-details-comments-edit-form'}
                articleId={articleId}
                comment={comment}
                onCancel={handleCancelEdit}
              />
            ) : (
              <p>{normalizeString(comment.message, 25, 15, 5)}</p>
            )}

            <div className="article-details-comment-list-item-content-button-block">
              {editingCommentId !== comment._id &&
                (userId === comment.userId || acc.isAdminRole()) && (
                  <>
                    {userId === comment.userId && (
                      <Button
                        className="small-link-button"
                        clickContent={() => handleEditClick(comment._id)}
                      >
                        Редактировать
                      </Button>
                    )}
                    <Button
                      className="small-link-button"
                      clickContent={() => handleDeleteClick(comment._id)}
                    >
                      Удалить
                    </Button>
                  </>
                )}
              {comment.userId !== userId && (
                <Button
                  className="small-link-button"
                  clickContent={() => handleRespond(comment.userName)}
                >
                  Ответить
                </Button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
