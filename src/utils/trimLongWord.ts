import trimString from '@/src/utils/trimString';

type TrimLongWord = (
  title: string,
  limit: number,
  start: number,
  end: number
) => string;

const trimLongWord: TrimLongWord = (title, limit, start, end) => {
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

export default trimLongWord;
