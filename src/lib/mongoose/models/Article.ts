import { Schema, model, models } from 'mongoose';

const articleSchema = new Schema(
  {
    idx: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    access: { type: String, default: 'private' },
    publishedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export const Article = models.Article || model('Article', articleSchema);
