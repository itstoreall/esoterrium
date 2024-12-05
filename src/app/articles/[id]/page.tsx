import { redirect } from 'next/navigation';
import metadataHandler from '@/src/utils/metadataHandler';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import ArticleDetailPage from '@/src/app/articles/[id]/article-detail';
import jsonParse from '@/src/utils/jsonParse';

type Props = { params: Promise<{ id: string }> };

const getArticle = async (id: string) => {
  try {
    const article = await getArticleById(id, 'lean');
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }
    return article;
  } catch (error) {
    throw error;
  }
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const article = await getArticle(id);
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
  const { id } = await params;

  try {
    if (!isAuthenticated) {
      redirect('/auth/sign-in');
    } else {
      const article = await getArticle(id);
      return <ArticleDetailPage article={jsonParse(article)} />;
    }
  } catch (error) {
    console.error(`Error generating metadata: ${error}`);
    return {
      title: 'Error',
      description: 'An error occurred while fetching the article.',
    };
  }
};

export default Article;
