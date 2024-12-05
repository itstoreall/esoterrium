import { useState } from 'react';
import { useCreateComment } from '@/src/hooks/useCreateComments';

type Props = {
  userName: string;
  articleId: string;
};

const AddCommentForm = (props: Props) => {
  const { userName, articleId } = props;

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
      createComment({ articleId, userName, message });
      setMessage('');
      setError('');
    } catch (err) {
      setError('Error posting comment');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>{userName}</span>
      <div>
        <textarea
          id="newComment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default AddCommentForm;
