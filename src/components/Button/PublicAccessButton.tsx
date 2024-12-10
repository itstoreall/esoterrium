import { useTransition } from 'react';
import { AxiosError } from 'axios';
import { updateArticle } from '@/src/services/articleService';
import Button from './Button';

type Props = {
  id: string;
  isDisable: boolean;
  handleIsPublicAccess: (is: boolean) => void;
};

const config = {
  confirmMsg:
    'Эта публикация станет общедоступной! Повторно изменить доступ будет невозможно. Также, вы не сможете ее удалить (только редактировать)',
  alertSuccess: 'Публикация успешно открыта для публичного просмотра!',
  alertError: 'An error occurred while changing access!',
};

const PublicAccessButton = ({ id, isDisable, handleIsPublicAccess }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleAccess = async () => {
    if (!confirm(config.confirmMsg)) return;

    try {
      if (isPending) return;
      startTransition(async () => {
        const payload = { access: 'public' };
        const res = await updateArticle(id, payload);
        if (res && res._id === id) {
          handleIsPublicAccess(true);
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
      clickContent={handleAccess}
      isDisable={isPending || isDisable}
    >
      {isPending ? 'В процессе...' : 'Общедоступно'}
    </Button>
  );
};

export default PublicAccessButton;
