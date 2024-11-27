/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleModal from '@/src/lib/mongoose/models/ArticleModel';
import connectToDatabase from '@/src/lib/mongoose/connect';

/*
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<any> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
*/

export const connect = connectToDatabase;
export const Article = ArticleModal;
