'use client';

import { useArticles } from '@/src/hooks/useArticles';
import { ArticleData } from '@/src/types';

const ArticlesPage = () => {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching articles</p>;

  console.log('articles:', articles);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article: ArticleData) => (
          <li key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
