/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CommentList from '@/src/components/Comments/CommentList';
import CommentForm from '@/src/components/Comments/CommentForm';
import { CommentData } from '@/src/types';

const Comments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [userName, setUserName] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [count, setCount] = useState(0);

  const session = useSession();

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${id}/comments`);
      const data = await response.json();
      setComments(data);
      setCount((prev) => prev + 1);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const startPolling = () => {
    setIsPolling(true);
  };

  const stopPolling = () => {
    setIsPolling(false);
  };

  console.log('comments:', comments);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  useEffect(() => {
    fetchComments();
    let interval: NodeJS.Timeout;
    if (isPolling) {
      interval = setInterval(fetchComments, 10000);
    }
    return () => clearInterval(interval);
  }, [isPolling]);

  return userName && comments ? (
    <section>
      <h2>Comments</h2>
      <span>{count}</span>

      <CommentForm
        userName={userName}
        articleId={id}
        refetch={fetchComments}
        onCommentCreated={startPolling}
      />
      <CommentList
        articleId={id}
        comments={comments}
        refetch={fetchComments}
        onStopPolling={stopPolling}
      />
    </section>
  ) : null;
};

export default Comments;
