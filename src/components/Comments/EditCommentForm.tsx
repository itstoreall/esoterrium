'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';

type EditCommentFormProps = {
  articleId: string;
  comment: CommentData;
  onCancel: () => void;
};

const EditCommentForm = (props: EditCommentFormProps) => {
  const { articleId, comment, onCancel } = props;

  const [updatedMessage, setUpdatedMessage] = useState('');
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    setUpdatedMessage(comment.message);
  }, [comment]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedMessage) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const res = await updateComment({
        articleId,
        commentId: comment._id,
        message: updatedMessage,
      });
      console.log('res:', res.status);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
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
