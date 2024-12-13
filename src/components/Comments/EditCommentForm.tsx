'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import Form from '../Form/Form';

type EditCommentFormProps = {
  className: 'article-details-comment-list-item-edit-form';
  articleId: string;
  comment: CommentData;
  onCancel: () => void;
};

const EditCommentForm = (props: EditCommentFormProps) => {
  const { className, articleId, comment, onCancel } = props;

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
    <Form className={className} handleSubmit={handleUpdate}>
      <textarea
        // placeholder="Напишите свой комментарий..."
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
        required
      />

      {error && <p>{error}</p>}

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </Form>
  );
};

export default EditCommentForm;
