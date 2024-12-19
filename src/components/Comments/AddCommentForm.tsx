import { useEffect, useState } from 'react';
import { useCreateComment } from '@/src/hooks/useCreateComments';
import { parseUniqueString } from '@/src/utils/uniqueStringHandler';
import Textarea from '../Form/Textarea';
import Button from '../Button/Button';
import Form from '../Form/Form';

type Props = {
  className: 'article-details-comments-add-form';
  userId: string;
  userName: string;
  articleId: string;
  respondTo: string;
};

const AddCommentForm = (props: Props) => {
  const { className, userId, userName, articleId, respondTo } = props;

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { createComment } = useCreateComment();

  useEffect(() => {
    setMessage((prev) => {
      // const splitUerName = respondTo.split('_|_')[1];
      const splitUerName = parseUniqueString(respondTo);

      switch (true) {
        case splitUerName && !!prev:
          const isAlreadyChosen = prev.includes(splitUerName);
          return isAlreadyChosen ? prev : `${splitUerName} ${prev}`;
        case !splitUerName && !!prev:
          return prev;
        case splitUerName && !prev:
          return splitUerName;
        case !splitUerName && !prev:
          return '';
        default:
          return '';
      }
    });
  }, [respondTo]);

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
      </div>
    </Form>
  );
};

export default AddCommentForm;
