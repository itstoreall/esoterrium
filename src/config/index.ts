import defaultImage from '@/src/assets/images/defaultImage.jpg';
import blueLotusImage from '@/src/assets/images/blueLotus.jpg';
import {
  CategoryEnum,
  TopicBooksEnum,
  TopicNumerologyEnum,
  TopicPracticesEnum,
} from '../enum';

// https://res.cloudinary.com/dsxdnz1hq/image/upload/v1732806735/cld-sample-2.jpg

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const config = {
  siteName: 'Esoterrium',
  baseDescription: 'Духовное саморазвитие',
  publicUrl,
  defaultImage,
  blueLotusImage,
  defaultImageUrl: `${publicUrl}/_next/static/media/defaultImage.c592ac5f.jpg`,
};

export const selectOptionsLvl1 = [
  CategoryEnum.Prosvetlenie,
  CategoryEnum.Numerology,
  CategoryEnum.Practices,
  CategoryEnum.Courses,
  CategoryEnum.Books,
];

export const selectOptionsNumerologyTopic = [
  TopicNumerologyEnum.FateMatrix,
  TopicNumerologyEnum.SpaceMatrix,
];

export const selectOptionsPracticesTopic = [
  TopicPracticesEnum.Elements,
  TopicPracticesEnum.Energy,
];

export const selectOptionsCourcesTopic = [
  TopicBooksEnum.Numerology,
  TopicBooksEnum.Bioenergy,
  TopicBooksEnum.Tarot,
];
