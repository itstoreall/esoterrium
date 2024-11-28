'use client';

import { useArticles } from '@/src/hooks/useArticles';
import { ArticleData } from '@/src/types';
import Link from 'next/link';

const ArticlesPage = () => {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching articles</p>;

  console.log('articles:', articles);

  return (
    <div>
      <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>

      <h1>Articles</h1>

      <ul>
        {articles.map((article: ArticleData) => (
          <li key={article._id} style={{ border: '1px solid #999999' }}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <Link href={`/articles/${article._id}`}>
              <button>Open</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
