import Link from 'next/link';
import { ArticleData } from '../types';
import PublishArticleButton from '@/src/components/Button/PublishArticleButton';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import Button from '@/src/components/Button/Button';

const AdminPanelArticleDetails = ({ article }: { article: ArticleData }) => {
  return (
    <div className="admin-panel admin-panel-article-details">
      <PublishArticleButton id={article._id} isDisable={article.isPublished} />

      <Link href={`/articles/${article._id}/edit`}>
        <Button className="admin-panel-text-button">Редактировать</Button>
      </Link>

      <DeleteArticleButton id={article._id} />
    </div>
  );
};

export default AdminPanelArticleDetails;
