import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticles } from '@/src/hooks/useArticles';
import useUserRole from '@/src/hooks/useUserRole';
import { AuthRoleEnum } from '@/src/enum';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';
import LoaderBlock from '@/src/components/LoaderBlock';
import AdminPanelArticleHandler from '@/src/components/Layout/AdminPanelArticleHandler';
import Title from '@/src/components/Layout/Title';
import { useEffect } from 'react';

const Articles = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const acc = useUserRole();
  const router = useRouter();

  useEffect(() => {
    acc.handleUserRole();
  }, [acc]);

  if (isLoading || !acc.userRole)
    return <LoaderBlock className={'light-loader-block'} />;

  if (isError) router.push('/articles/error');

  console.log('acc.userRole', acc.userRole, AuthRoleEnum.Admin);

  return (
    <Main className={'articles-page-main'}>
      <Title tag="h2" className="page-main-title" text="Публикации" />

      {acc.isAdminRole() && (
        <AdminPanelArticleHandler articlesNumber={articles.length} />
      )}

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
