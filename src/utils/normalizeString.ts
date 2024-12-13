import trimString from '@/src/utils/trimString';

type NormalizeString = (
  title: string,
  limit: number,
  start: number,
  end: number
) => string;

const normalizeString: NormalizeString = (title, limit, start, end) => {
  const splitTitle = title.split(' ');

  const trimedString = splitTitle.map((word) => {
    if (word.length < limit) {
      return word;
    } else {
      return trimString(word, start, end, '-');
    }
  });

  const normalString = trimedString.join(' ');
  return normalString;
};

export default normalizeString;
