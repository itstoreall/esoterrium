import { useState } from 'react';
import { addComment } from '@/src/services/commentsService';

type Props = {
  userName: string;
  articleId: string;
  refetch: () => void;
};

const AddCommentForm = (props: Props) => {
  const { userName, articleId, refetch } = props;

  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [isPulling, setIsPulling] = useState(false);

  const checkNewComments = () => {
    setIsPulling(true);
    let count = 0;
    const pull = () => {
      setTimeout(() => {
        count += 1;
        if (count <= 5) {
          console.log(count);
          refetch();
          pull();
        }
        return;
      }, 5000);
      if (count >= 5) setIsPulling(false);
    };
    pull();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !userName) {
      setError('Both user and comment are required');
      return;
    }

    try {
      await addComment(articleId, { userName, message: newComment });
      setNewComment('');
      setError('');
      refetch();
      if (!isPulling) checkNewComments();
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
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default AddCommentForm;
