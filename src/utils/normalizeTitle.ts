import trimString from '@/src/utils/trimString';

type NormalizeTitle = (
  title: string,
  limit: number,
  start: number,
  end: number
) => string;

const normalizeTitle: NormalizeTitle = (title, limit, start, end) => {
  const splitTitle = title.split(' ');

  const trimedTitle = splitTitle.map((word) => {
    if (word.length < limit) {
      return word;
    } else {
      return trimString(word, start, end, '-');
    }
  });

  const normalTitle = trimedTitle.join(' ');
  return normalTitle;
};

export default normalizeTitle;
