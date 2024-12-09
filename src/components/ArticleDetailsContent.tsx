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

const ArticleDetailsContent = ({ article }: { article: ArticleData }) => {
  return (
    <Main className={'article-details-page-main'}>
      <Section className={'main-hero-section'}>{null}</Section>

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

      <p className="article-details-text readable-content">{article.content}</p>

      <div className="mt-6">
        <DeleteArticleButton id={article._id} />
      </div>

      <Link href={`/articles/${article._id}/edit`}>
        <button>Edit</button>
      </Link>

      <CommentBlock articleId={article._id} />
    </Main>
  );
};

export default ArticleDetailsContent;
