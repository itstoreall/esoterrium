/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CommentList from '@/src/components/Comments/CommentList';
import AddCommentForm from '@/src/components/Comments/AddCommentForm';
import { CommentData } from '@/src/types';

// const Comments = ({ id }: { id: string }) => {
const Comments = ({
  articleId,
  initialComments,
}: {
  articleId: string;
  initialComments: CommentData[];
}) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [userName, setUserName] = useState('');

  const session = useSession();

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  console.log('comments:', comments);

  useEffect(() => {
    setComments(initialComments);
  }, []);

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  return userName && comments ? (
    <section>
      <h2>Comments</h2>

      <AddCommentForm
        userName={userName}
        articleId={articleId}
        refetch={fetchComments}
      />

      <button onClick={fetchComments}>Refetch comments</button>

      <CommentList
        articleId={articleId}
        comments={comments}
        refetch={fetchComments}
      />
    </section>
  ) : null;
};

export default Comments;
