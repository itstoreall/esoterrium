import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import DeleteArticleButton from '@/src/components/Button/DeleteArticleButton';
import FacebookSDKLoader from '@/src/components/Layout/FacebookSDKLoader';

type Props = { params: Promise<{ id: string }> };

const ArticleDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const article = await getArticleById(id, 'exec');

    if (!article) {
      throw new Error('Article not found');
    }

    return (
      <>
        <FacebookSDKLoader />

        <div>
          <Link href="/dashboard">
            <button>Dashboard</button>
          </Link>
          <Link href="/articles">
            <button>Articles</button>
          </Link>
          <Link href={`/articles/${article.id}/edit`}>
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
            <DeleteArticleButton id={article.id} />
          </div>

          <div
            className="fb-comments"
            data-href={`https://www.esoterrium.space/articles/${article.id}`}
            data-width="320"
            data-numposts=""
          ></div>
        </div>
      </>
    );
  } catch (error) {
    console.error(`Error fetching article: ${error}`);
    redirect(`/articles/${id}/error`);
  }
};

export default ArticleDetailPage;
