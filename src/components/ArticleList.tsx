import Image from 'next/image';
import Link from 'next/link';
import normalizeString from '@/src/utils/normalizeString';
import { ArticleData } from '@/src/types';
import { config } from '@/src/config';

const ArticleList = ({ articles }: { articles: ArticleData[] }) => {
  return articles.length ? (
    <ul className="article-list">
      {articles.map((article: ArticleData) => (
        <li key={article._id} className="article-list-item">
          <div className="article-list-item-content">
            <Link href={`/articles/${article._id}`}>
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
