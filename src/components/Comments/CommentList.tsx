'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import EditCommentForm from '@/src/components/Comments/EditCommentForm';

type Props = {
  articleId: string;
  comments: CommentData[];
};

const CommentList = ({ articleId, comments }: Props) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleDeleteClick = async (commentId: string) => {
    try {
      const res = await deleteComment({ articleId, commentId });
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <ul>
      {comments.map((comment: CommentData, index: number) => (
        <li key={index}>
          {editingCommentId === comment._id ? (
            <EditCommentForm
              articleId={articleId}
              comment={comment}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <strong>{comment.userName}</strong>: {comment.message}
              <button onClick={() => handleEditClick(comment._id)}>Edit</button>
              <button onClick={() => handleDeleteClick(comment._id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
