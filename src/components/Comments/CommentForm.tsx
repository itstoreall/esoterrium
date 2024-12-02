import { useState } from 'react';
import { postComment } from '@/src/services/commentsService';

type Props = {
  user: string;
  articleId: string;
  refetch: () => void;
};

const CommentForm = ({ user, articleId, refetch }: Props) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  console.log('user:', user);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !user) {
      setError('Both user and comment are required');
      return;
    }

    try {
      await postComment(articleId, { user, message: newComment });
      setNewComment('');
      setError('');
      refetch(); // Refresh comments
    } catch (err) {
      setError('Error posting comment');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handlePostComment}>
      <span>{user}</span>
      <div>
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
      </div>
      {error && <p >{error}</p>}
      <button type="submit">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
