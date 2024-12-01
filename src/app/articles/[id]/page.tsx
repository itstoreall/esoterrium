import { redirect } from 'next/navigation';
import { checkIsAuthenticated } from '@/src/lib/auth/checkIsAuthedServerAction';
import { getArticleById } from '@/src/lib/mongoose/getArticleByIdServerAction';
import ArticleDetailPage from '@/src/app/articles/[id]/article-detail';
import defaultImage from '@/src/assets/images/defaultImage.jpg';

type Props = { params: Promise<{ id: string }> };

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const config = {
  siteName: 'Esoterrium',
  defaultImage,
  defaultImageUrl: `${publicUrl}/_next/static/media/defaultImage.c592ac5f.jpg`,
};

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

    const titleMetadata = article.title;
    const descriptionMetadata = `${article.content.slice(0, 160)}...`;
    const imageMetadata = [
      {
        url: article.image || config.defaultImageUrl,
        width: 1200,
        height: 630,
        alt: article.title,
      },
    ];

    return {
      title: titleMetadata,
      description: descriptionMetadata,
      openGraph: {
        title: titleMetadata,
        description: descriptionMetadata,
        url: `${publicUrl}/articles/${article._id}`,
        siteName: config.siteName,
        images: imageMetadata,
        type: 'article',
        authors: [config.siteName],
      },
      twitter: {
        card: 'summary_large_image',
        title: titleMetadata,
        description: descriptionMetadata,
        images: imageMetadata,
      },
    };

    /*
    return {
      title: article.title,
      description: article.content.slice(0, 160), // Excerpt for SEO
      openGraph: {
        title: article.title,
        description: article.content.slice(0, 160),
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article._id}`,
        type: 'article',
        images: [
          {
            url:
              article.image ||
              `${process.env.NEXT_PUBLIC_SITE_URL}/default-image.jpg`,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.content.slice(0, 160),
        images: [
          article.image ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/default-image.jpg`,
        ],
      },
    };
    */
  } catch (error) {
    console.error(`Error generating metadata: ${error}`);
    return {
      title: 'Error',
      description: 'An error occurred while fetching the article.',
    };
  }
}

/*
images: [
  {
    url:
      article.image ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/default-image.jpg`,
    alt: article.title,
  },
],
*/

const Article = async ({ params }: Props) => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  } else {
    return <ArticleDetailPage params={params} />;
  }
};

export default Article;
