'use server';

// import mongoose from 'mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';
import { ArticleData } from '@/src/types';

export const getLatestArticle = async (): Promise<ArticleData | null> => {
  const latestArticle = await Article.findOne()
    .sort({ publishedAt: -1 })
    .lean<ArticleData>();

  if (!latestArticle) {
    return null;
  }

  const mappedArticle: ArticleData = {
    _id: latestArticle._id.toString(),
    idx: latestArticle.idx,
    title: latestArticle.title,
    content: latestArticle.content,
    image: latestArticle.image,
    author: latestArticle.author,
    tags: latestArticle.tags,
    views: latestArticle.views,
    likes: latestArticle.likes,
    isPublished: latestArticle.isPublished,
    access: latestArticle.access,
    publishedAt: latestArticle.publishedAt,
    createdAt: latestArticle.createdAt,
    updatedAt: latestArticle.updatedAt,
  };

  return mappedArticle;

  /* works
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }

  const latestArticle = await Article.findOne().sort({ idx: -1 });

  if (latestArticle) {
    return latestArticle.toObject();
  }

  return null;
  */
};
