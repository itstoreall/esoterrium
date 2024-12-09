import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticles } from '@/src/hooks/useArticles';
import useUserRole from '@/src/hooks/useUserRole';
import { ArticleData } from '@/src/types';
import Main from '@/src/components/Layout/Main';
import LoaderBlock from '@/src/components/LoaderBlock';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import Section from '@/src/components/Section';
import Title from '@/src/components/Layout/Title';

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

  return (
    <Main className={'articles-page-main'}>
      <Section className={'main-hero-section'}>
        <Title tag="h2" className="page-main-title" text="Публикации" />
      </Section>

      {acc.isAdminRole() && (
        <AdminPanelArticles articlesNumber={articles.length} />
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

      <Section className={'main-final-section'}>{null}</Section>
    </Main>
  );
};

export default Articles;
