'use client';

import { useState } from 'react';
import { CommentData } from '@/src/types';
import EditCommentForm from '@/src/components/Comments/EditCommentForm';

type Props = {
  articleId: string;
  comments: CommentData[];
  refetch: () => void;
};

const CommentList = ({ articleId, comments, refetch }: Props) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  // console.log('comments:', comments);

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <ul>
      {comments.map((comment: CommentData, index: number) => (
        <li key={index}>
          {editingCommentId === comment._id ? (
            <EditCommentForm
              articleId={articleId}
              comment={comment}
              refetch={refetch}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <strong>{comment.userName}</strong>: {comment.message}
              <button onClick={() => handleEditClick(comment._id)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

/*
'use client';

const CommentList = ({ comments }: { comments: any }) => {
  console.log('comments:', comments);
  return (
    <ul>
      {comments.map((comment: any, index: number) => (
        <li key={index}>
          <strong>{comment.user}</strong>: {comment.message}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
*/
