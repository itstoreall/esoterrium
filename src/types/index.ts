import { ReactNode } from 'react';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

// ------ Article:

export type ArticleData = {
  _id: string;
  idx: number;
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  views: string[];
  likes: string[];
  isPublished: boolean;
  access: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentData = {
  _id: string;
  articleId: string;
  userId: string;
  userName: string;
  message: string;
  updatedAt: Date;
  createdAt: Date;
};
