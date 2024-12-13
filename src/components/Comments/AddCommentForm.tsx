import { useState } from 'react';
import { useCreateComment } from '@/src/hooks/useCreateComments';
import Form from '../Form/Form';
import Button from '../Button/Button';
import Textarea from '../Form/Textarea';

type Props = {
  className: 'article-details-comments-add-form';
  userId: string;
  userName: string;
  articleId: string;
  refetchComments: () => void;
};

const AddCommentForm = (props: Props) => {
  const { className, userId, userName, articleId, refetchComments } = props;

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { createComment } = useCreateComment();

  const handleChangeMessage = (msg: string) => setMessage(msg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === '' || message.trim() === '') {
      alert('All fields are required.');
      return;
    }

    try {
      createComment({ articleId, userId, userName, message });
      setMessage('');
      setError('');
    } catch (err) {
      setError('Error posting comment');
      console.error(err);
    }
  };

  return (
    <Form className={className} handleSubmit={handleSubmit}>
      <span className="article-details-comments-add-form-username">
        {userName}
      </span>
      <div className="article-details-comments-add-form-textarea-block">
        <Textarea
          className="article-details-comments-add-form-textarea"
          placeholder="Напишите свой комментарий..."
          value={message}
          maxLength={252}
          handleChangeValue={handleChangeMessage}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <div className="article-details-comments-add-form-button-block">
        <Button
          className="article-details-comments-add-form-submit-button"
          type="submit"
        >
          Комментировать
        </Button>

        <Button
          type="button"
          className="article-details-comments-add-form-refetch-button"
          clickContent={refetchComments}
        >
          Обновить
        </Button>
      </div>
    </Form>
  );
};

export default AddCommentForm;
