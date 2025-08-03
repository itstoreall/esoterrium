import { redirect } from 'next/navigation';
// import jsonParse from '@/src/utils/jsonParse';
import metadataHandler from '@/src/utils/metadataHandler';
import { roleAccess } from '@/src/lib/auth/roleAccessServerAction';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import ArticleDetailPage from '@/src/app/articles/[id]/article-detail';

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
  const { id } = await params;
  const article = await getArticle(id);

  if (article.access === 'public') {
    // const d = {
    //   _id: '67719da6bfd356c5bf540700',
    //   idx: 3,
    //   title: 'Шесть миров',
    //   content: 'Шесть миров бытия',
    //   image:
    //     'https://res.cloudinary.com/dsxdnz1hq/image/upload/v1744298123/lokas_r6srkx.jpg',
    //   author: 'Esoterrium',
    //   tags: ['Просветление'],
    //   views: ['cm4mu7gw90000bkpyolhloi9k'],
    //   likes: [],
    //   isPublished: true,
    //   access: 'public',
    //   publishedAt: new Date(),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
    // return <ArticleDetailPage article={d} />;
    return <ArticleDetailPage article={article} />;
    // return <div style={{ color: 'red' }}>Details 1 {article._id}</div>;
    // return <ArticleDetailPage article={jsonParse(article)} />;
  } else {
    const access = await roleAccess('article-details');
    if (!access.isAccess) {
      const redirectPath = access.role === null ? '/auth/sign-in' : '/auth/ban';
      redirect(redirectPath);
    }

    const isAuthenticated = await checkIsAuthenticated();

    try {
      if (!isAuthenticated) {
        redirect('/auth/sign-in');
      } else {
        // const d = {
        //   _id: '67719da6bfd356c5bf540700',
        //   idx: 3,
        //   title: 'Шесть миров',
        //   content: 'Шесть миров бытия',
        //   image:
        //     'https://res.cloudinary.com/dsxdnz1hq/image/upload/v1744298123/lokas_r6srkx.jpg',
        //   author: 'Esoterrium',
        //   tags: ['Просветление'],
        //   views: ['cm4mu7gw90000bkpyolhloi9k'],
        //   likes: [],
        //   isPublished: true,
        //   access: 'public',
        //   publishedAt: new Date(),
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // };
        return <ArticleDetailPage article={article} />;
        // return <div style={{ color: 'red' }}>Details 2 {article._id}</div>;
        // return <ArticleDetailPage article={jsonParse(article)} />;
      }
    } catch (error) {
      console.error(`Error generating metadata: ${error}`);
      return {
        title: 'Error',
        description: 'An error occurred while fetching the article.',
      };
    }
  }
};

export default Article;
