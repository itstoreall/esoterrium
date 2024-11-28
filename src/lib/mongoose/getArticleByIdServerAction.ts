'use server';

import mongoose from 'mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

export const getArticleById = async (id: string) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
  return await Article.findById(id).exec();
};
