type TrimString = (address: string, start: number, end: number) => string;

const trimString: TrimString = (str, start, end) => {
  if (!str || start < 0 || end < 0) return str;
  return Math.min(start + end, str.length) < str.length
    ? `${str.slice(0, start)}...${str.slice(-end)}`
    : str;
};

export default trimString;
