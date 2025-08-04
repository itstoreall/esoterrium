import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/src/config';
import { ArticleData } from '@/src/types';
import trimLongWord from '@/src/utils/trimLongWord';
import ProgressLoader from './ProgressBlock';

type Props = {
  articles: ArticleData[];
  className?: 'article-list-theme-light' | 'article-list-theme-dark';
};

const ArticleList = ({ articles, className }: Props) => {
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);

  const handleItemClick = (articleId: string) => {
    setLoadingArticleId(articleId);
    setTimeout(() => {
      setLoadingArticleId(null);
    }, 5000);
  };

  return articles.length ? (
    <ul className="article-list">
      {articles.map((article: ArticleData) => (
        <li
          key={article._id}
          className="article-list-item"
          onClick={() => handleItemClick(article._id)}
        >
          <div className={`article-list-item-content ${className}`}>
            <Link href={`/articles/${article._id}`}>
              <div className="image-block article-list-item-thumb">
                <Image
                  src={article.image || config.defaultImageUrl}
                  className="article-list-item-image"
                  fill
                  priority={true}
                  alt={article.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {loadingArticleId !== article._id ? (
                <h3 className="article-list-item-title">
                  {trimLongWord(article.title, 20, 15, 5)}
                </h3>
              ) : (
                <div className="article-list-item-progress-loader-block">
                  <ProgressLoader duration={2000} />
                </div>
              )}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>Материалы отсутствуют</p>
  );
};

export default ArticleList;

/*
'DWEWFWERGRTHTAAAVAAA' - 20 chars
*/
