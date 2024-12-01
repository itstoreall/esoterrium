import { Metadata } from 'next';
import { ArticleData } from '@/src/types';
import defaultImage from '@/src/assets/images/defaultImage.jpg';

type Handler = (
  label: 'general' | 'article',
  article?: ArticleData
) => Metadata;

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const config = {
  siteName: 'Esoterrium',
  baseDescription: 'Духовное саморазвитие',
  defaultImage,
  defaultImageUrl: `${publicUrl}/_next/static/media/defaultImage.c592ac5f.jpg`,
};

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

  const fbAppId = {
    property: 'fb:app_id',
    content: process.env.FACEBOOK_APP_ID || '',
  };

  const generalMetadata = {
    title: config.siteName,
    description: `${config.siteName} - ${config.baseDescription}`,
    openGraph: {
      title: config.siteName,
      description: config.baseDescription,
      url: `${publicUrl}`,
      siteName: config.siteName,
      images: [imageMetadata],
      type: 'article',
      authors: [config.siteName],
      additionalMetaTags: [fbAppId],
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
        openGraph: {
          title: titleMetadata,
          description: descriptionMetadata,
          url: `${publicUrl}/articles/${article._id}`,
          siteName: config.siteName,
          images: [imageMetadata],
          type: 'article',
          authors: [config.siteName],
          additionalMetaTags: [fbAppId],
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
