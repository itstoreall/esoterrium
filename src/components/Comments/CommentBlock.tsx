'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useComments } from '@/src/hooks/useComments';
import AddCommentForm from '@/src/components/Comments/AddCommentForm';
import CommentList from '@/src/components/Comments/CommentList';

const CommentBlock = ({ articleId }: { articleId: string }) => {
  const [userName, setUserName] = useState('');

  const comments = useComments(articleId);
  const session = useSession();

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  return userName && comments.data ? (
    <section>
      <h2>Comments</h2>

      <AddCommentForm userName={userName} articleId={articleId} />

      {/* <button onClick={fetchComments}>Refetch comments</button> */}

      <CommentList articleId={articleId} comments={comments.data} />
    </section>
  ) : null;
};

export default CommentBlock;
