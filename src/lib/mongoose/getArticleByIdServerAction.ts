'use server';

import mongoose from 'mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

type purpose = 'lean' | 'exec';

export const getArticleById = async (id: string, purpose: purpose) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }

  const query = Article.findById(id);

  switch (purpose) {
    case 'lean':
      return await query.lean(); // Using 'lean' for minimal data
    case 'exec':
      return await query.exec();
    default:
      return await query;
  }
};
