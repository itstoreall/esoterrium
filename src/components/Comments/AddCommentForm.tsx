import { useState } from 'react';
import { useCreateComment } from '@/src/hooks/useCreateComments';
import Form from '../Form/Form';
import Button from '../Button/Button';

type Props = {
  className: 'article-details-comments-add-form';
  userId: string;
  userName: string;
  articleId: string;
};

const AddCommentForm = (props: Props) => {
  const { className, userId, userName, articleId } = props;

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { createComment } = useCreateComment();

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
        <textarea
          className="article-details-comments-add-form-textarea"
          id="newComment"
          placeholder="Напишите свой комментарий..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {error && <p>{error}</p>}

      <Button
        className="article-details-comments-add-form-submit-button"
        type="submit"
      >
        Комментировать
      </Button>
    </Form>
  );
};

export default AddCommentForm;
