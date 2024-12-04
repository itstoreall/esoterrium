import { useArticles } from '@/src/hooks/useArticles';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';

const Articles = () => {
  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching articles</p>;

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
            {/* <Link href={`/articles/${article._id}`}>
              <button>Open</button>
            </Link> */}
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Articles;
