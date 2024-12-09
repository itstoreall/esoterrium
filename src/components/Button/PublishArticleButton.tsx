import { useState, useTransition } from 'react';
import { AxiosError } from 'axios';
import { updateArticle } from '@/src/services/articleService';
import Button from './Button';

type Props = { id: string; isDisable: boolean };

const PublishArticleButton = ({ id, isDisable }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isPublished, setIsPublished] = useState(isDisable);

  const handlePublish = async () => {
    if (!confirm('Эта статья будет опубликована для сообщества!')) return;

    try {
      if (isPending) return;
      startTransition(async () => {
        const payload = { isPublished: true, publishedAt: new Date() };
        const res = await updateArticle(id, payload);
        if (res && res._id === id) {
          setIsPublished(true);
          alert('Статья успешно опубликована!');
        }
      });
    } catch (err: unknown) {
      alert(
        (err as AxiosError).message || 'An error occurred while publishing'
      );
    }
  };

  return (
    <Button
      className={`admin-panel-text-button ${
        isPublished || isDisable ? 'disabled' : ''
      }`}
      clickContent={handlePublish}
      isDisable={isPublished || isPending || isDisable}
    >
      {isPending
        ? 'В процессе...'
        : isPublished || isDisable
        ? 'Опубликовано'
        : 'Опубликовать'}
    </Button>
  );
};

export default PublishArticleButton;
