import { Metadata } from 'next';
import { ArticleData } from '@/src/types';
import { config } from '@/src/config';

type Handler = (
  label: 'general' | 'article',
  article?: ArticleData
) => Metadata;

const metadataHandler: Handler = (label, article) => {
  const imageSize = { width: 1200, height: 630 };
  const imageMetadata = article?.image
    ? {
        url: article.image,
        alt: article.title,
        ...imageSize,
      }
    : {
        url: config.defaultImageUrl,
        alt: config.siteName,
        ...imageSize,
      };

  const otherMetadata = {
    ['fb:app_id']: process.env.FACEBOOK_APP_ID || '',
  };

  const generalMetadata = {
    title: config.siteName,
    description: `${config.siteName} - ${config.baseDescription}`,
    other: otherMetadata,
    openGraph: {
      title: config.siteName,
      description: config.baseDescription,
      url: `${config.publicUrl}`,
      siteName: config.siteName,
      images: [imageMetadata],
      type: 'article',
      authors: [config.siteName],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.siteName,
      description: config.baseDescription,
      images: [imageMetadata],
    },
  };

  switch (label) {
    case 'general':
      return generalMetadata;

    case 'article':
      if (!article) return generalMetadata;
      const titleMetadata = article.title;
      const descriptionMetadata = `${article.content.slice(0, 160)}...`;
      return {
        title: titleMetadata,
        description: descriptionMetadata,
        other: otherMetadata,
        openGraph: {
          title: titleMetadata,
          description: descriptionMetadata,
          url: `${config.publicUrl}/articles/${article._id}`,
          siteName: config.siteName,
          images: [imageMetadata],
          type: 'article',
          authors: [config.siteName],
        },
        twitter: {
          card: 'summary_large_image',
          title: titleMetadata,
          description: descriptionMetadata,
          images: [imageMetadata],
        },
      };

    default:
      return generalMetadata;
  }
};

export default metadataHandler;
