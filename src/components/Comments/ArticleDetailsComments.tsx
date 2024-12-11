'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useComments } from '@/src/hooks/useComments';
import AddCommentForm from '@/src/components/Comments/AddCommentForm';
import CommentList from '@/src/components/Comments/CommentList';
import Section from '@/src/components/Section';

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
    <Section className="article-details-comments-section">
      <h3 className="comment-block-title">{`Комментарии (${32})`}</h3>

      <div className="article-details-comments-content">
        <AddCommentForm userName={userName} articleId={articleId} />

        {/* <button onClick={fetchComments}>Refetch comments</button> */}

        <CommentList articleId={articleId} comments={comments.data} />
      </div>
    </Section>
  ) : null;
};

export default CommentBlock;
