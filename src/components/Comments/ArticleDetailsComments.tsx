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

  const userId = session.data?.user?.id ?? '';

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  return userName && comments.data ? (
    <Section className="article-details-comments-section">
      <h3 className="comment-block-title">
        {'Комментарии'}
        <span
          className={'comment-block-title-counter'}
        >{`(${comments.data.length})`}</span>
      </h3>

      <div className="article-details-comments-content">
        <AddCommentForm
          className={'article-details-comments-add-form'}
          userId={userId}
          userName={userName}
          articleId={articleId}
          refetchComments={comments.refetch}
        />

        <CommentList
          userId={userId}
          articleId={articleId}
          comments={comments.data}
        />
      </div>
    </Section>
  ) : null;
};

export default CommentBlock;
