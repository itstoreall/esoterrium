'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { deleteArticle } from '@/src/services/articleService';

type Props = { id: string };

const DeleteArticleButton = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      if (isPending) return;
      startTransition(async () => {
        const res = await deleteArticle(id);
        if (res) {
          alert(res.message);
          router.push('/articles');
        }
      });
    } catch (err: unknown) {
      alert((err as AxiosError).message || 'An error occurred while deleting');
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete Article'}
    </button>
  );
};

export default DeleteArticleButton;
