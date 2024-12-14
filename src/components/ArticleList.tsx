import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import normalizeString from '@/src/utils/normalizeString';
import { ArticleData } from '@/src/types';
import { config } from '@/src/config';
import ProgressLoader from './ProgressBlock';

const ArticleList = ({ articles }: { articles: ArticleData[] }) => {
  const [chosenArticle, setChosenArticle] = useState('');

  return articles.length ? (
    <ul className="article-list">
      {articles.map((article: ArticleData) => (
        <li key={article._id} className="article-list-item">
          <div className="article-list-item-content">
            {chosenArticle ? (
              <>
                <div className="image-block article-list-item-thumb">
                  {article._id !== chosenArticle ? (
                    <Image
                      src={article.image || config.defaultImageUrl}
                      className={'article-list-item-image'}
                      fill
                      priority={true}
                      alt={article.title}
                    />
                  ) : (
                    <div className="article-list-item-progress-loader-block">
                      <ProgressLoader duration={2000} />
                    </div>
                  )}
                </div>

                <h3 className="article-list-item-title">
                  {normalizeString(article.title, 20, 15, 5)}
                </h3>
              </>
            ) : (
              <Link
                href={`/articles/${article._id}`}
                onClick={() => setChosenArticle(article._id)}
              >
                <div className="image-block article-list-item-thumb">
                  <Image
                    src={article.image || config.defaultImageUrl}
                    className={'article-list-item-image'}
                    fill
                    priority={true}
                    alt={article.title}
                  />
                </div>

                <h3 className="article-list-item-title">
                  {normalizeString(article.title, 20, 15, 5)}
                </h3>
              </Link>
            )}
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
