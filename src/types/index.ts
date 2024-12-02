import { ReactNode } from 'react';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;

// ------ Article:

export type CommentData = {
  _id: string;
  userName: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleData = {
  _id: string;
  idx: number;
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  views: number;
  comments: CommentData[];
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
