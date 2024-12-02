/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getComments } from '@/src/services/commentsService';
import { CommentData } from '@/src/types';
import AddCommentForm from '@/src/components/Comments/AddCommentForm';
import CommentList from '@/src/components/Comments/CommentList';

type Props = {
  articleId: string;
  initialComments: CommentData[];
};

const Comments = ({ articleId, initialComments }: Props) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [userName, setUserName] = useState('');

  const session = useSession();

  useEffect(() => {
    setComments(initialComments);
  }, []);

  useEffect(() => {
    if (session && session.data?.user?.name) {
      setUserName(session.data?.user?.name);
    }
  }, [session]);

  // ---

  const fetchComments = async () => {
    try {
      const response = await getComments(articleId);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

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
