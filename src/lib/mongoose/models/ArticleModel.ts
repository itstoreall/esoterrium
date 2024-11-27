import { Schema, model, models } from 'mongoose';

const articleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Article || model('Article', articleSchema);
