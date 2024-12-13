'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateComment } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import Form from '../Form/Form';
import Button from '../Button/Button';
import Textarea from '../Form/Textarea';

type EditCommentFormProps = {
  className: 'article-details-comments-edit-form';
  articleId: string;
  comment: CommentData;
  onCancel: () => void;
};

const EditCommentForm = (props: EditCommentFormProps) => {
  const { className, articleId, comment, onCancel } = props;

  const [updatedMessage, setUpdatedMessage] = useState('');
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const handleChangeMessage = (msg: string) => setUpdatedMessage(msg);

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
      <Textarea
        className="article-details-comments-edit-form-textarea"
        placeholder="Напишите свой комментарий..."
        value={updatedMessage}
        maxLength={252}
        handleChangeValue={handleChangeMessage}
        required
        isAutoFocus
      />

      {error && <p>{error}</p>}

      <div className="article-details-comment-list-item-content-edit-form-button-block">
        <Button className="link-button" type="submit">
          Сохранить
        </Button>
        <Button className="link-button" type="button" clickContent={onCancel}>
          Отменить
        </Button>
      </div>
    </Form>
  );
};

export default EditCommentForm;
