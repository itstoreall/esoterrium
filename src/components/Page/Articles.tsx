import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserRole from '@/src/hooks/useUserRole';
import { useArticles } from '@/src/hooks/useArticles';
import useLoader from '@/src/hooks/useLoader';
import { ArticleData } from '@/src/types';
import Section from '@/src/components/Section';
import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import ArticleList from '@/src/components/ArticleList';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import FilterValueBlock from '@/src/components/FilterValueBlock';
import Sidebar from '@/src/components/Layout/Sidebar';
import Title from '@/src/components/Layout/Title';

const Articles = () => {
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);
  const [adminfilterValue, setAdminFilterValue] = useState('');
  const [tagFilterValue, setTagFilterValue] = useState('');

  const { data: articles, isLoading, isError } = useArticles();
  const { isLoader, Loader } = useLoader();
  const router = useRouter();
  const acc = useUserRole();

  const handleAdminFilterValue = (val: string) => setAdminFilterValue(val);

  const handleCategory = (tag: string | null) => {
    setTagFilterValue(tag || '');
  };

  const resetFilter = (label: string) => {
    if (label === 'admin') {
      setAdminFilterValue('');
    } else if (label === 'tag') {
      setTagFilterValue('');
    }
  };

  useEffect(() => {
    if (!articles) return;
    let filtered = articles;
    if (adminfilterValue) {
      switch (adminfilterValue) {
        case 'public':
          filtered = filtered.filter(
            (art: ArticleData) => art.access === 'public'
          );
          break;
        case 'private':
          filtered = filtered.filter(
            (art: ArticleData) => art.access === 'private' && !!art.isPublished
          );
          break;
        case 'draft':
          filtered = filtered.filter(
            (art: ArticleData) => art.access === 'private' && !art.isPublished
          );
          break;
        default:
          break;
      }
    }
    if (tagFilterValue) {
      filtered = filtered.filter((art: ArticleData) =>
        art.tags?.includes(tagFilterValue)
      );
    }
    setFilteredArticles(filtered);
  }, [articles, adminfilterValue, tagFilterValue]);

  // ---

  if (isError) router.push('/articles/error');

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="articles-sidebar" handleCategory={handleCategory} />

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
                handleAdminFilterValue={handleAdminFilterValue}
              />
            )}

            <span className="articles-page-main-divider" />

            {(adminfilterValue || tagFilterValue) && (
              <Section className={'main-filter-value-section'}>
                <FilterValueBlock
                  adminfilterValue={adminfilterValue}
                  tagFilterValue={tagFilterValue}
                  resetFilter={resetFilter}
                />
              </Section>
            )}

            <ArticleList articles={filteredArticles} />

            <Section className={'main-final-section'}>{null}</Section>
          </>
        )}
      </Main>
    </Container>
  );
};

export default Articles;
