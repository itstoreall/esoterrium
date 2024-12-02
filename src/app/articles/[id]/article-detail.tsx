import Link from 'next/link';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import { ArticleData } from '@/src/types';

const ArticleDetailPage = async ({ article }: { article: ArticleData }) => {
  return (
    <div>
      <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link href="/articles">
        <button>Articles</button>
      </Link>
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
    </div>
  );
};

export default ArticleDetailPage;
