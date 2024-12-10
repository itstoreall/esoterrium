import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticles } from '@/src/hooks/useArticles';
import useUserRole from '@/src/hooks/useUserRole';
import useLoader from '@/src/hooks/useLoader';
import { ArticleData } from '@/src/types';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import Sidebar from '@/src/components/Layout/Sidebar';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';

const Articles = () => {
  const { data: articles, isLoading, isError } = useArticles();
  const { isLoader, Loader } = useLoader();
  const router = useRouter();
  const acc = useUserRole();

  useEffect(() => {
    acc.handleUserRole();
  }, [acc]);

  if (isError) router.push('/articles/error');

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="article-details-sidebar" />

      <Main className={'article-details-page-main'}>
        {isLoading || !acc.userRole || isLoader ? (
          <Loader className={'main-combine-light-loader-block'} />
        ) : (
          <>
            <Section className={'main-hero-section'}>
              <Title tag="h2" className="page-main-title" text="Публикации" />
            </Section>

            {acc.isAdminRole() && <AdminPanelArticles articles={articles} />}

            <ul>
              {articles?.map((article: ArticleData) => (
                <li key={article._id} style={{ border: '1px solid #999999' }}>
                  <h2>{article.title}</h2>
                  <p>{article.content}</p>
                  <Link href={`/articles/${article._id}`}>
                    <button>Open</button>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <Section className={'main-final-section'}>{null}</Section>
      </Main>
    </Container>

    // <Main className={'articles-page-main'}>
    //   <Section className={'main-hero-section'}>
    //     <Title tag="h2" className="page-main-title" text="Публикации" />
    //   </Section>

    //   {acc.isAdminRole() && <AdminPanelArticles articles={articles} />}

    //   <ul>
    //     {articles.map((article: ArticleData) => (
    //       <li key={article._id} style={{ border: '1px solid #999999' }}>
    //         <h2>{article.title}</h2>
    //         <p>{article.content}</p>
    //         <Link href={`/articles/${article._id}`}>
    //           <button>Open</button>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>

    //   <Section className={'main-final-section'}>{null}</Section>
    // </Main>
  );
};

export default Articles;
