import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useArticles } from '@/src/hooks/useArticles';
import useUserRole from '@/src/hooks/useUserRole';
import useLoader from '@/src/hooks/useLoader';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import Sidebar from '@/src/components/Layout/Sidebar';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import ArticleList from '@/src/components/ArticleList';

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

            <ArticleList articles={articles} />
          </>
        )}

        <Section className={'main-final-section'}>{null}</Section>
      </Main>
    </Container>
  );
};

export default Articles;
