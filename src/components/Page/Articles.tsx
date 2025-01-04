/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserRole from '@/src/hooks/useUserRole';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import { useArticles } from '@/src/hooks/useArticles';
import useLoader from '@/src/hooks/useLoader';
import { ArticleData } from '@/src/types';
import * as gc from '@/src/config';
import Section from '@/src/components/Section';
import Main from '@/src/components/Layout/Main';
import Container from '@/src/components/Container';
import ArticleList from '@/src/components/ArticleList';
import AdminPanelArticles from '@/src/components/AdminPanelArticles';
import FilterValueBlock from '@/src/components/FilterValueBlock';
import Sidebar from '@/src/components/Layout/Sidebar';
import Title from '@/src/components/Layout/Title';
import SelectMulti from '../Form/SelectMulti';
import { CategoryEnum } from '@/src/enum';

const Articles = () => {
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);
  const [adminFilterValue, setAdminFilterValue] = useState('');
  const [isSelectError, setIsSelectError] = useState(false);
  const [isResetLvl2, setIsResetLvl2] = useState(false);
  const [categoryTag, setCategoryTag] = useState('');
  const [topicTag, setTopicTag] = useState('');

  const { data: articles, isLoading, isError } = useArticles();
  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const { isLoader, Loader } = useLoader();
  const router = useRouter();
  const acc = useUserRole();

  const isNumerology = categoryTag === CategoryEnum.Numerology;
  const isPractices = categoryTag === CategoryEnum.Practices;
  const isCources = categoryTag === CategoryEnum.Courses;
  const isBooks = categoryTag === CategoryEnum.Books;
  const isLvl2 = isNumerology || isPractices || isCources || isBooks;

  const selectOptionsLvl2 = isNumerology
    ? gc.selectOptionsNumerologyTopic
    : isPractices
    ? gc.selectOptionsPracticesTopic
    : isCources || isBooks
    ? gc.selectOptionsCourcesTopic
    : [];

  const handleAdminFilterValue = (val: string) => setAdminFilterValue(val);

  const handleCategory = (tag: string | null) => {
    setCategoryTag(tag || '');
  };

  const handleTagLvl2Select = (selectedTag: string) => {
    if (isSelectError) handleSelectError(false);
    setTopicTag(selectedTag);
  };

  const handleSelectError = (is: boolean) => {
    setIsSelectError(is);
  };

  const resetFilter = (label: string) => {
    if (label === 'admin') {
      setAdminFilterValue('');
    } else if (label === 'category') {
      setCategoryTag('');
      setTopicTag('');
      toggleDropdown('');
      setIsResetLvl2(true);
      setTimeout(() => setIsResetLvl2(false), 1000);
    } else if (label === 'topic') {
      setTopicTag('');
      toggleDropdown('');
      setIsResetLvl2(true);
      setTimeout(() => setIsResetLvl2(false), 1000);
    } else if (label === 'category_and_topic') {
      setCategoryTag(categoryTag || '');
      setTopicTag(''); // Reset topic tag
      toggleDropdown(''); // Close any open dropdowns
      setIsResetLvl2(true);
      setTimeout(() => setIsResetLvl2(false), 1000);

      if (articles) {
        const filtered = articles.filter((art: ArticleData) =>
          art.tags[0]?.includes(categoryTag || '')
        );
        setFilteredArticles(filtered);
      }
    }
  };

  useEffect(() => {
    resetFilter('category_and_topic');
  }, [categoryTag]);

  useEffect(() => {
    if (!articles) return;
    let filtered = articles;
    if (adminFilterValue) {
      switch (adminFilterValue) {
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
    if (categoryTag) {
      filtered = filtered.filter((art: ArticleData) =>
        art.tags[0]?.includes(categoryTag)
      );
    }
    if (topicTag) {
      filtered = filtered.filter((art: ArticleData) =>
        art.tags[1]?.includes(topicTag)
      );
    }
    setFilteredArticles(filtered);
  }, [articles, adminFilterValue, categoryTag, topicTag]);

  // ---

  if (isError) router.push('/articles/error');

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="articles-sidebar" handleCategory={handleCategory} />

      <Main className={'articles-page-main'}>
        <Section className={'main-heading-combine-section first-element'}>
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

            {/* <span className="articles-page-main-divider" /> */}

            {(adminFilterValue || categoryTag) && (
              <Section className={'main-filter-value-section'}>
                <FilterValueBlock
                  adminfilterValue={adminFilterValue}
                  categoryTag={categoryTag}
                  topicTag={topicTag}
                  resetFilter={resetFilter}
                />

                <SelectMulti
                  className="article-edit-form-select light-select-theme"
                  options={selectOptionsLvl2.filter((opt) => opt !== topicTag)}
                  initialOption={null}
                  placeholder="Тема"
                  onSelect={handleTagLvl2Select}
                  isError={isSelectError}
                  isReset={isResetLvl2}
                  isDisable={!isLvl2}
                  isOpen={openDropdownId === 'topic'}
                  onToggle={() => toggleDropdown('topic')}
                />
              </Section>
            )}

            <ArticleList articles={filteredArticles} />

            {/* <Section className={'main-final-section'}>{null}</Section> */}
          </>
        )}
      </Main>
    </Container>
  );
};

export default Articles;
