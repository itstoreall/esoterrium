import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Comment = models.Comment || model('Comment', commentSchema);
