import Link from 'next/link';
import { ArticleData } from '@/src/types';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
// import Comments from '@/src/components/Comments';
import Main from '@/src/components/Layout/Main';
import CommentBlock from '../Comments/CommentBlock';

const ArticleDetails = ({ article }: { article: ArticleData }) => {
  return (
    <Main className={'article-details-page-main'}>
      <Link href={`/articles/${article._id}/edit`}>
        <button>Edit</button>
      </Link>

      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>
        <small>
          Created on: {new Date(article.createdAt).toLocaleDateString()} |
          Updated on: {new Date(article.updatedAt).toLocaleDateString()}
        </small>
      </p>
      <div className="mt-6">
        <DeleteArticleButton id={article._id} />
      </div>

      {/* <Comments articleId={article._id} initialComments={article.comments} /> */}
      <CommentBlock articleId={article._id} />
    </Main>
  );
};

export default ArticleDetails;
