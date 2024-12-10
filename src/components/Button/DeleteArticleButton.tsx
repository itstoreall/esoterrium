'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { deleteArticle } from '@/src/services/articleService';
import Button from './Button';

type Props = { id: string; isDisable: boolean };

const config = {
  confirmMsg: 'Эта публикация будет удалена безвозвратно!',
  alertSuccess:
    'Публикация успешно удалена! Ссылка на данную статью больше не активна.',
  alertError: 'An error occurred while deleting!',
};

const DeleteArticleButton = ({ id, isDisable }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(config.confirmMsg)) return;

    try {
      if (isPending) return;
      startTransition(async () => {
        const res = await deleteArticle(id);
        if (res) {
          alert(config.alertSuccess);
          router.push('/articles');
        }
      });
    } catch (err: unknown) {
      alert((err as AxiosError).message || config.alertError);
    }
  };

  return (
    <Button
      className="admin-panel-text-button"
      clickContent={handleDelete}
      isDisable={isDisable || isPending}
    >
      {isPending ? 'В процессе...' : 'Удалить'}
    </Button>
  );
};

export default DeleteArticleButton;
