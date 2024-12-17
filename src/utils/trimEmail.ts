type TrimEmail = (address: string, start: number, end: number) => string;

const trimEmail: TrimEmail = (email, start, end) => {
  if (!email || start < 0 || end < 0 || !email.includes('@')) return email;
  const splitEmail = email.split('@');
  const username = splitEmail[0];
  return Math.min(start + end, username.length) < username.length
    ? `${username.slice(0, start)}...${username.slice(-end)}@${splitEmail[1]}`
    : username;
};

export default trimEmail;
