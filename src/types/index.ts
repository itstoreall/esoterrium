import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AuthRoleEnum } from '@/src/enum';

export type ChildrenProps = { children: ReactNode };

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type TextareaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type BooleanState = Dispatch<SetStateAction<boolean>>;

// ------ User:

export type UserData = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  role: AuthRoleEnum;
  points: number;
  image: string | null;
  accessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

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
