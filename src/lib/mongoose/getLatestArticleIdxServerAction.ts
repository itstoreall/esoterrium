'use server';

import mongoose from 'mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

export const getLatestArticleIdx = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }

  const latestArticle = await Article.findOne().sort({ idx: -1 });

  if (latestArticle) {
    const { idx } = latestArticle.toObject();
    return { idx };
  }

  return null;
};
