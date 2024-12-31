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
// import Title from '../Layout/Title';
// import Title from '../Layout/Title';
// import { config } from '@/src/config'; // https://www.esoterrium.space/_next/static/media/blueLotus.940f885c.jpg

// const arts = [
//   'article1',
//   'article2',
//   'article3',
//   // 'article4',
//   // 'article5',
// ];

const Home = () => {
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);

  const { data: articles, isLoading } = usePublicArticles(); // isError

  useEffect(() => {
    if (!articles) return;
    setFilteredArticles(articles);
  }, [articles]);

  return (
    <Main className={'home-page-main'}>
      <Section className={'main-hero-section'}>{null}</Section>

      <Section className={'blue-lotus-home-section'}>
        <div className="blue-lotus-home-section-rotating-block"></div>

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

        {/* <Link href="/dashboard">
          <Button className="nav-link-text-button">Перейти в аккаунт</Button>
        </Link> */}
      </Section>

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

      {/* {arts.map((art) => (
        <div
          key={art}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <Section className={'readable-content-section'}>
            <Title
              tag="h2"
              className="readable-content"
              text={'Витвір мовленнєвого процесу'}
            />
            <p className="readable-content">
              Текст — це витвір мовленнєвого процесу, що відзначається
              завершеністю, обєктивований у вигляді письмового документа,
              літературно опрацьований відповідно до типу документа, витвір,
              який складається із заголовка і ряду особливих одиниць
              (надфразових єдностей), обєднаних різними типами лексичного,
              граматичного, логічного, стилістичного звязку, і має певну
              цілеспрямованість і прагматичну визначеність
            </p>
          </Section>

          <Link href="/dashboard">
            <Section className={'readable-content-section'}>
              <Title
                tag="h2"
                className="readable-content"
                text={'Product of the speech process'}
              />
              <p className="readable-content">
                A text is a product of the speech process, characterized by a
                product of the speech process, which is characterized by
                completeness, objectified in the form of a written document,
                literary processed in accordance with the type of document, a
                work, consisting of a title and a number of special units
                (superphrase unities), united by different types of lexical
                grammatical, logical, stylistic connection, and has a certain
                purposefulness and pragmatic certainty Translated with DeepL.com
                (free version)
              </p>
            </Section>
          </Link>
        </div>
      ))} */}
      {/* <Section className={'main-final-section'}>{null}</Section> */}
    </Main>
  );
};

export default Home;
