import { useArticles } from '@/src/hooks/useArticles';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';
import Link from 'next/link';

const Articles = () => {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading)
    return (
      <Main className={'articles-page-main'}>
        <p>Loading...</p>
      </Main>
    );

  if (isError)
    return (
      <Main className={'articles-page-main'}>
        <p>Error fetching articles</p>
      </Main>
    );

  console.log('articles:', articles);

  return (
    <Main className={'articles-page-main'}>
      {/* <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link href="/articles/create">
        <button>Create</button>
      </Link> */}

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
    </Main>
  );
};

export default Articles;
