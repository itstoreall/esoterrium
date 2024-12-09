import Image from 'next/image';
import Link from 'next/link';
// import useUserRole from '@/src/hooks/useUserRole';
import { config } from '@/src/config';
import { ArticleData } from '@/src/types';
import ArticleDetailsPublicationInfo from '@/src/components/ArticleDetailsPublicationInfo';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import CommentBlock from '@/src/components/Comments/CommentBlock';
import Main from '@/src/components/Layout/Main';
import Section from '@/src/components/Section';
import Title from '@/src/components/Layout/Title';
import Container from '@/src/components/Container';
import Sidebar from '@/src/components/Layout/Sidebar';

const ArticleDetailsContent = ({ article }: { article: ArticleData }) => {
  return (
    <Container className="main-aside-combine-container">
      <Sidebar className="article-details-sidebar">
        <Section className={'main-hero-section'}>{null}</Section>
        <div>
          <div style={{ marginBottom: '1rem' }}>Нумерология</div>
          <div style={{ marginBottom: '1rem' }}>Астрология</div>
          <div style={{ marginBottom: '1rem' }}>Матрица</div>
          <div style={{ marginBottom: '1rem' }}>Практики</div>
          <div style={{ marginBottom: '1rem' }}>Книги</div>
        </div>

        <div
          style={{
            // backgroundColor: 'teal',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '340px',
            color: '#c2c4c5',
            border: '1px solid #c2c4c5',
          }}
        >
          Реклама
        </div>

        <div
          style={{
            // backgroundColor: 'teal',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '340px',
            color: '#c2c4c5',
            border: '1px solid #c2c4c5',
          }}
        >
          Реклама
        </div>

        <Section className={'main-final-section'}>{null}</Section>
      </Sidebar>

      <Main className={'article-details-page-main'}>
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

        <Section>
          <div className="mt-6">
            <DeleteArticleButton id={article._id} />
          </div>

          <Link href={`/articles/${article._id}/edit`}>
            <button>Edit</button>
          </Link>
        </Section>

        <CommentBlock articleId={article._id} />

        <Section className={'main-final-section'}>{null}</Section>
      </Main>
    </Container>
  );
};

export default ArticleDetailsContent;
