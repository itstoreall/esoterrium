import defaultImage from '@/src/assets/images/defaultImage.jpg';
import blueLotusImage from '@/src/assets/images/blueLotus.jpg';

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
