import { ReactNode } from 'react';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;

// ------ Article:

export type ArticleData = {
  _id: string;
  idx: number;
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  views: number;
  comments: string[];
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
