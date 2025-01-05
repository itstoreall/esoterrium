'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePublicArticles } from '@/src/hooks/usePublicArticles';
import { ArticleData } from '@/src/types';
import ProgressLoader from '@/src/components/ProgressBlock';
import ArticleList from '@/src/components/ArticleList';
import Main from '@/src/components/Layout/Main';
import Hero from '@/src/components/Layout/Hero';
import Section from '@/src/components/Section';

// https://www.esoterrium.space/_next/static/media/blueLotus.940f885c.jpg

const Home = () => {
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);

  const { data: articles, isLoading } = usePublicArticles(); // isError

  useEffect(() => {
    if (!articles) return;
    setFilteredArticles(articles);
  }, [articles]);

  return (
    <Main className={'home-page-main'}>
      <Hero className="home-hero-block">
        <Section className={'home-hero-section'}>
          <div className="home-hero-section-rotating-block"></div>

          <div className="image-block home-page-main-thumb">
            <Image
              src={
                'https://www.esoterrium.space/_next/static/media/blueLotus.940f885c.jpg'
              }
              className={'home-page-main-image'}
              fill
              priority={true}
              alt={'blue lotus'}
            />
          </div>
        </Section>
      </Hero>

      <Section className={'public-articles-home-section'}>
        {/* <Title
          tag="h3"
          className="public-articles-home-section-title"
          text="Публикации"
        /> */}

        {isLoading ? (
          <div className="public-articles-home-section-content-loader-block">
            <ProgressLoader className="dark-loader-block" duration={2000} />
          </div>
        ) : (
          <ArticleList
            className="article-list-theme-dark"
            articles={filteredArticles}
          />
        )}
      </Section>
    </Main>
  );
};

export default Home;
