'use client';

import { useState } from 'react';
import { updateComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';

type EditCommentFormProps = {
  articleId: string;
  comment: CommentData;
  // comment: { _id: string; user: string; message: string };
  refetch: () => void;
  onCancel: () => void;
};

const EditCommentForm = ({
  articleId,
  comment,
  refetch,
  onCancel,
}: EditCommentFormProps) => {
  const [updatedMessage, setUpdatedMessage] = useState(comment.message);
  const [error, setError] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedMessage) {
      setError('Message cannot be empty');
      return;
    }

    try {
      await updateComment(articleId, {
        commentId: comment._id,
        message: updatedMessage,
      });
      refetch();
      onCancel();
    } catch (err) {
      setError('Error updating comment');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <textarea
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditCommentForm;
