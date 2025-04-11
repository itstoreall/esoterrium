import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArticleData } from '@/src/types';
import PublishArticleButton from '@/src/components/Button/PublishArticleButton';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import PublicAccessButton from '@/src/components/Button/PublicAccessButton';
import Button from '@/src/components/Button/Button';
import { useSession } from 'next-auth/react';

const AdminPanelArticleDetails = ({ article }: { article: ArticleData }) => {
  const [isPublished, setIsPublished] = useState(article.isPublished);
  const [isPublicAccess, setIsPublicAccess] = useState(true);

  const session = useSession();

  const esoterriumEmail = session.data?.user?.email;
  const isEsoterriumAuthor = article.author === 'Esoterrium';
  const isEsoterriumEditor = esoterriumEmail?.split('@')[0] === 'esoterrium';

  useEffect(() => {
    if (article.access === 'private') setIsPublicAccess(false);
  }, [article]);

  const handleIsPublished = (is: boolean) => setIsPublished(is);
  const handleIsPublicAccess = (is: boolean) => setIsPublicAccess(is);

  return (
    <div className="admin-panel admin-panel-article-details">
      <div className="admin-panel-article-details-content">
        <PublishArticleButton
          id={article._id}
          isDisable={isPublished}
          handleIsPublished={handleIsPublished}
        />

        <Link
          href={
            isEsoterriumAuthor && !isEsoterriumEditor
              ? `/articles/${article._id}`
              : `/articles/${article._id}/edit`
          }
        >
          <Button
            className="admin-panel-text-button"
            isDisable={isEsoterriumAuthor && !isEsoterriumEditor}
          >
            Редактировать
          </Button>
        </Link>
      </div>

      <div className="admin-panel-article-details-content">
        <PublicAccessButton
          id={article._id}
          isDisable={isPublicAccess || !isPublished}
          handleIsPublicAccess={handleIsPublicAccess}
        />

        <DeleteArticleButton id={article._id} isDisable={isPublicAccess} />
      </div>
    </div>
  );
};

export default AdminPanelArticleDetails;
