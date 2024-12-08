import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticles } from '@/src/hooks/useArticles';
import useAccount from '@/src/hooks/useAccount';
import { AuthRoleEnum } from '@/src/enum';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';
import LoaderBlock from '@/src/components/LoaderBlock';
import AdminPanelArticleHandler from '@/src/components/Layout/AdminPanelArticleHandler';
import Title from '@/src/components/Layout/Title';
import { useEffect } from 'react';

const Articles = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const acc = useAccount();
  const router = useRouter();

  useEffect(() => {
    acc.handleUserRole();
  }, [acc]);

  if (isLoading) return <LoaderBlock className={'light-loader-block'} />;

  if (isError) router.push('/articles/error');

  console.log('acc.userRole', acc.userRole, AuthRoleEnum.Admin);

  return (
    <Main className={'articles-page-main'}>
      {/* <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link href="/articles/create">
        <button>Create</button>
      </Link> */}

      <Title tag="h2" className="page-main-title" text="Публикации" />

      {acc.userRole === AuthRoleEnum.Admin && <AdminPanelArticleHandler />}

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
