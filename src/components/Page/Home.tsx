'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link';
import { usePublicArticles } from '@/src/hooks/usePublicArticles';
// import { useArticles } from '@/src/hooks/useArticles';
import { ArticleData } from '@/src/types';
import ArticleList from '@/src/components/ArticleList';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import ProgressLoader from '../ProgressBlock';
import Hero from '../Layout/Hero';
// import Title from '../Layout/Title';
// import Title from '../Layout/Title';
// import { config } from '@/src/config';

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
            <div className="home-page-main-loader-block theme-light">
              <ProgressLoader className="dark-loader-block" duration={2000} />
            </div>
          </div>
        ) : (
          <ArticleList
            className="article-list-theme-dark"
            articles={filteredArticles}
          />
        )}
      </Section>

      {/* <Section className={'main-final-section'}>{null}</Section> */}
    </Main>
  );
};

export default Home;
