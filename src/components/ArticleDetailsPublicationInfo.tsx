import { ArticleData } from '@/src/types';
import convertDate from '@/src/utils/convertDate';

type Props = {
  article: ArticleData;
};

const ArticleDetailsPublicationInfo = ({ article }: Props) => {
  return (
    <div className="article-details-publication-info-block">
      <span className="article-details-publication-author">
        Автор: {article.author}
      </span>
      <span className="article-details-publication-divider">|</span>
      <span className="article-details-publication-date">
        Опубликовано: {convertDate(article.publishedAt)}
      </span>
    </div>
  );
};

export default ArticleDetailsPublicationInfo;
