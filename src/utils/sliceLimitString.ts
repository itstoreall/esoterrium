type TrimString = (username: string, limit: number) => string;

const sliceLimitString: TrimString = (username, limit) => {
  if (!username) return username;
  if (username.length > limit) {
    return `${username.slice(0, limit)}...`;
  } else return username;
};

export default sliceLimitString;
