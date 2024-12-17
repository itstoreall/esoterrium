import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticles } from '@/src/hooks/useArticles';
import useUserRole from '@/src/hooks/useUserRole';
import useLoader from '@/src/hooks/useLoader';
import { ArticleData } from '@/src/types';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import ArticleList from '@/src/components/ArticleList';
import Sidebar from '@/src/components/Layout/Sidebar';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';

const Articles = () => {
  const [filteredArticles, setFilteredArticles] = useState();
  const [filterValue, setFilterValue] = useState('');

  const { data: articles, isLoading, isError } = useArticles();
  const { isLoader, Loader } = useLoader();
  const router = useRouter();
  const acc = useUserRole();

  const handleFilterValue = (val: string) => setFilterValue(val);

  // useEffect(() => {
  //   acc.handleUserRole();
  // }, [acc]);

  useEffect(() => {
    switch (filterValue) {
      case 'public':
        const publicArticles = articles.filter(
          (art: ArticleData) => art.access === 'public'
        );
        setFilteredArticles(publicArticles);
        break;
      case 'private':
        const privateArticles = articles.filter(
          (art: ArticleData) => art.access === 'private' && !!art.isPublished
        );
        setFilteredArticles(privateArticles);
        break;
      case 'draft':
        const draftArticles = articles.filter(
          (art: ArticleData) => art.access === 'private' && !art.isPublished
        );
        console.log('draftArticles:', draftArticles);
        setFilteredArticles(draftArticles);
        break;
      default:
        setFilteredArticles(articles);
        break;
    }
  }, [articles, filterValue]);

  if (isError) router.push('/articles/error');

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="articles-sidebar" />

      <Main className={'articles-page-main'}>
        <Section className={'main-hero-section'}>
          <Title tag="h2" className="page-main-title" text="Публикации" />
        </Section>

        {isLoading || !acc.userRole || isLoader || !filteredArticles ? (
          <Loader className={'main-combine-light-loader-block'} />
        ) : (
          <>
            {acc.isAdminRole() && (
              <AdminPanelArticles
                articles={articles}
                handleFilterValue={handleFilterValue}
              />
            )}

            <span className="articles-page-main-divider" />

            <ArticleList articles={filteredArticles} />
          </>
        )}

        <Section className={'main-final-section'}>{null}</Section>
      </Main>
    </Container>
  );
};

export default Articles;
