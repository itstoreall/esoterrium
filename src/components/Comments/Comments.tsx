/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CommentList from '@/src/components/Comments/CommentList';
import CommentForm from '@/src/components/Comments/CommentForm';

const Comments = ({ id }: { id: string }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');

  const session = useSession();

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUser(session.data?.user?.name);
    }
  }, [session]);

  return user && comments ? (
    <section>
      <h2>Comments</h2>

      <CommentForm user={user} articleId={id} refetch={fetchComments} />
      <CommentList articleId={id} comments={comments} refetch={fetchComments} />
    </section>
  ) : null;
};

export default Comments;
