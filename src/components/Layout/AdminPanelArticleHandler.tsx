import Link from 'next/link';
import Button from '@/src/components/Button/Button';

const AdminPanelArticleHandler = () => {
  return (
    <div className="admin-panel admin-panel-article-handler">
      <Link href="/articles/create">
        <Button className="admin-panel-text-button">Добавить</Button>
      </Link>
    </div>
  );
};

export default AdminPanelArticleHandler;
