'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useComments } from '@/src/hooks/useComments';
import AddCommentForm from '@/src/components/Comments/AddCommentForm';
import CommentList from '@/src/components/Comments/CommentList';
import Section from '@/src/components/Section';
import Button from '../Button';

const CommentBlock = ({ articleId }: { articleId: string }) => {
  const [userName, setUserName] = useState('');
  const [respondTo, setRespondTo] = useState('');

  const comments = useComments(articleId);
  const session = useSession();

  const userId = session.data?.user?.id ?? '';

  const handleRespondTo = (userName: string) => setRespondTo(userName);

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  return userName && comments.data ? (
    <Section className="article-details-comments-section">
      <div className="article-details-comments-heading">
        <h3 className="comment-block-title">
          {'Комментарии'}
          <span
            className={'comment-block-title-counter'}
          >{`(${comments.data.length})`}</span>
        </h3>

        <Button
          type="button"
          className="small-border-button-comments-update"
          clickContent={comments.refetch}
        >
          Обновить комментарии
        </Button>
      </div>

      <div className="article-details-comments-content">
        <AddCommentForm
          className={'article-details-comments-add-form'}
          userId={userId}
          userName={userName}
          articleId={articleId}
          respondTo={respondTo}
        />

        {!!comments.data.length && (
          <CommentList
            userId={userId}
            articleId={articleId}
            comments={comments.data}
            handleRespondTo={handleRespondTo}
          />
        )}
      </div>
    </Section>
  ) : null;
};

export default CommentBlock;
