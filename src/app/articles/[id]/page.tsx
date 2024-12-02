import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import ArticleDetailPage from '@/src/app/articles/[id]/article-detail';
import Comments from '@/src/components/Comments/Comments';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  try {
    const article = await getArticleById(id, 'lean');

    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }

    return metadataHandler('article', article);
  } catch (error) {
    console.error(`Error generating metadata: ${error}`);
    return {
      title: 'Error',
      description: 'An error occurred while fetching the article.',
    };
  }
}

const Article = async ({ params }: Props) => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return (
      <>
        <ArticleDetailPage params={params} />
        <Comments id={(await params).id} />
      </>
    );
  }
};

export default Article;
