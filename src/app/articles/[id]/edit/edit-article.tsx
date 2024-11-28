import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import EditArticleForm from '@/src/components/Form/EditArticleForm';

type Props = { params: Promise<{ id: string }> };

const EditArticlePage = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const article = await getArticleById(id, 'lean');

    if (!article) {
      throw new Error('Article not found');
    }

    return (
      <div>
        <Link href="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link href="/articles">
          <button>Articles</button>
        </Link>
        <Link href={`/articles/${id}`}>
          <button>Cancel</button>
        </Link>

        <h1>Edit Article</h1>
        <EditArticleForm article={JSON.parse(JSON.stringify(article))} />
      </div>
    );
  } catch (error) {
    console.error(`Error editing an article: ${error}`);
    redirect(`/articles/${id}/error`);
  }
};

export default EditArticlePage;
