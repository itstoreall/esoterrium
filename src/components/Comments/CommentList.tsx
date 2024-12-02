'use client';

import { useState } from 'react';
import { deleteComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import EditCommentForm from '@/src/components/Comments/EditCommentForm';

type Props = {
  articleId: string;
  comments: CommentData[];
  refetch: () => void;
};

const CommentList = ({ articleId, comments, refetch }: Props) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleDeleteClick = async (commentId: string) => {
    try {
      await deleteComment(articleId, commentId);
      refetch();
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
              refetch={refetch}
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
