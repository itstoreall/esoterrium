type TrimString = (
  address: string,
  start: number,
  end: number,
  divider?: string
) => string;

const trimString: TrimString = (str, start, end, divider) => {
  if (!str || start < 0 || end < 0) return str;
  return Math.min(start + end, str.length) < str.length
    ? `${str.slice(0, start)}${divider ? divider : '...'}${str.slice(-end)}`
    : str;
};

export default trimString;
