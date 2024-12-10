'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import useUserRole from '@/src/hooks/useUserRole';
import useLoader from '@/src/hooks/useLoader';
import { config } from '@/src/config';
import { ArticleData } from '@/src/types';
import ArticleDetailsPublicationInfo from '@/src/components/ArticleDetailsPublicationInfo';
import AdminPanelArticleDetails from '@/src/components/AdminPanelArticleDetails';
import CommentBlock from '@/src/components/Comments/CommentBlock';
import Sidebar from '@/src/components/Layout/Sidebar';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';

const ArticleDetailsContent = ({ article }: { article: ArticleData }) => {
  const { isLoader, Loader } = useLoader();
  const acc = useUserRole();

  useEffect(() => {
    acc.handleUserRole();
  }, [acc]);

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="article-details-sidebar" />

      <Main className={'article-details-page-main'}>
        {!acc.userRole || isLoader ? (
          <Loader className="light-loader-block" />
        ) : (
          <>
            <Section className={'main-hero-section'}>{null}</Section>

            <Section className="article-details-section">
              <Title
                className="article-details-title readable-content "
                text={article.title}
              />

              <ArticleDetailsPublicationInfo article={article} />

              <div className="image-block article-details-image-block">
                <Image
                  src={article.image || config.defaultImageUrl}
                  className={'image-block-image'}
                  fill
                  priority={true}
                  alt={article.title}
                />
              </div>

              <p className="article-details-text readable-content">
                {article.content}
              </p>
            </Section>

            {acc.isAdminRole() && (
              <AdminPanelArticleDetails article={article} />
            )}

            <CommentBlock articleId={article._id} />

            <Section className={'main-final-section'}>{null}</Section>
          </>
        )}
      </Main>
    </Container>
  );
};

export default ArticleDetailsContent;
