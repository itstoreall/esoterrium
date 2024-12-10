import Link from 'next/link';
import { ArticleData } from '../types';
import PublishArticleButton from '@/src/components/Button/PublishArticleButton';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import PublicAccessButton from './Button/PublicAccessButton';
import Button from '@/src/components/Button/Button';
import { useEffect, useState } from 'react';

const AdminPanelArticleDetails = ({ article }: { article: ArticleData }) => {
  const [isPublished, setIsPublished] = useState(article.isPublished);
  const [isPublicAccess, setIsPublicAccess] = useState(true);

  useEffect(() => {
    if (article.access === 'private') setIsPublicAccess(false);
  }, [article]);

  // const isPublicAccess = article.access === 'public';
  // const isPublished = !!article.isPublished;

  const handleIsPublished = (is: boolean) => setIsPublished(is);
  const handleIsPublicAccess = (is: boolean) => setIsPublicAccess(is);

  return (
    <div className="admin-panel admin-panel-article-details">
      <PublishArticleButton
        id={article._id}
        isDisable={isPublished}
        // isPublished={isPublished}
        handleIsPublished={handleIsPublished}
      />

      <Link href={`/articles/${article._id}/edit`}>
        <Button className="admin-panel-text-button">Редактировать</Button>
      </Link>

      <DeleteArticleButton id={article._id} isDisable={isPublicAccess} />

      <PublicAccessButton
        id={article._id}
        isDisable={isPublicAccess || !isPublished}
        handleIsPublicAccess={handleIsPublicAccess}
        // isPublished={isPublished}
        // handleIsPublished={handleIsPublished}
        // isPublished={isPublished}
        // handleIsPublished={handleIsPublished}
      />
    </div>
  );
};

export default AdminPanelArticleDetails;
