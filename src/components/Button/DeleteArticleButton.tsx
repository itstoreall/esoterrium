'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { deleteArticle } from '@/src/services/articleService';
import Button from './Button';

type Props = { id: string };

const DeleteArticleButton = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Эта публикация будет удалена безвозвратно!')) {
      return;
    }

    try {
      if (isPending) return;
      startTransition(async () => {
        const res = await deleteArticle(id);
        if (res) {
          alert('Публикация успешно удалена!');
          router.push('/articles');
        }
      });
    } catch (err: unknown) {
      alert((err as AxiosError).message || 'An error occurred while deleting');
    }
  };

  return (
    <Button
      className="admin-panel-text-button"
      clickContent={handleDelete}
      isDisable={isPending}
    >
      {isPending ? 'В процессе...' : 'Удалить'}
    </Button>
  );
};

export default DeleteArticleButton;
