import { useTransition } from 'react';
import { AxiosError } from 'axios';
import { updateArticle } from '@/src/services/articleService';
import Button from './Button';

type Props = {
  id: string;
  isDisable: boolean;
  handleIsPublished: (is: boolean) => void;
};

const config = {
  confirmMsg: 'Эта статья будет опубликована для сообщества!',
  alertSuccess:
    'Статья успешно опубликована! Все участники сообщества смогут ее прочитать.',
  alertError: 'An error occurred while publishing!',
};

const PublishArticleButton = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const { id, isDisable, handleIsPublished } = props;

  // const [isPublished, setIsPublished] = useState(isDisable);

  const handlePublish = async () => {
    if (!confirm(config.confirmMsg)) return;

    try {
      if (isPending) return;
      startTransition(async () => {
        const payload = { isPublished: true, publishedAt: new Date() };
        const res = await updateArticle(id, payload);
        if (res && res._id === id) {
          handleIsPublished(true);
          alert(config.alertSuccess);
        }
      });
    } catch (err: unknown) {
      alert((err as AxiosError).message || config.alertError);
    }
  };

  return (
    <Button
      className={`admin-panel-text-button ${isDisable ? 'disabled' : ''}`}
      clickContent={handlePublish}
      isDisable={isPending || isDisable}
    >
      {isPending
        ? 'В процессе...'
        : isDisable
        ? 'Опубликовано'
        : 'Опубликовать'}
    </Button>
  );
};

export default PublishArticleButton;
