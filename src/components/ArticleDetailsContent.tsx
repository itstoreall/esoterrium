'use client';

// import Image from 'next/image';
import useUserRole from '@/src/hooks/useUserRole';
import useLoader from '@/src/hooks/useLoader';
// import { config } from '@/src/config';
import { ArticleData } from '@/src/types';
import trimLongWord from '@/src/utils/trimLongWord';
// import ArticleDetailsPublicationInfo from '@/src/components/ArticleDetailsPublicationInfo';
// import AdminPanelArticleDetails from '@/src/components/AdminPanelArticleDetails';
// import ArticleDetailsComments from '@/src/components/Comments';
// import MDEditorBlock from '@/src/components/MDEditorBlock';
import Sidebar from '@/src/components/Layout/Sidebar';
import Container from '@/src/components/Container';
import Title from '@/src/components/Layout/Title';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';

const ArticleDetailsContent = ({ article }: { article: ArticleData }) => {
  const { isLoader, Loader } = useLoader();
  const acc = useUserRole();

  const isPublic = article.access === 'public';

  // console.log('acc:', acc);

  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="article-details-sidebar" />

      <Main className={'article-details-page-main'}>
        {(!isPublic && !acc.userRole) || isLoader ? (
          <>
            <Section className={'main-heading-section article-details-heading'}>
              <Title tag="h2" className="page-main-title" text={'...'} />
            </Section>
            <Loader className="light-loader-block" />
          </>
        ) : (
          <>
            <Section className="article-details-section">
              <Title
                className="article-details-title readable-content "
                text={trimLongWord(article.title, 20, 15, 5)}
              />

              <div style={{ color: 'green', paddingTop: '100px' }}>
                Details 6 {`${article.title} - ${isPublic}`}
              </div>

              {/* <ArticleDetailsPublicationInfo article={article} />

              {acc.isAdminRole() && (
                <AdminPanelArticleDetails article={article} />
              )}

              <div className="image-block article-details-thumb">
                <Image
                  src={article.image || config.defaultImageUrl}
                  className={'article-details-image'}
                  fill
                  priority={true}
                  alt={article.title}
                />
              </div>

              <MDEditorBlock
                className="article-details-mdeditor-block"
                text={article.content}
              /> */}
            </Section>

            <span className="articles-page-main-divider" />

            {/* <ArticleDetailsComments articleId={article._id} /> */}
          </>
        )}
      </Main>
    </Container>
  );
};

export default ArticleDetailsContent;
