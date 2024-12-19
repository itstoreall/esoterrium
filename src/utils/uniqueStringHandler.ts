export const makeUniqueString = (str: string): string => {
  if (!str) return str;
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  // const markedUserNameTemplate = `${timestamp}_|_${str}, `;
  const markedUserNameTemplate = `${str}_|_${timestamp}`;
  return markedUserNameTemplate;
};

export const parseUniqueString = (str: string): string => {
  const pureString = str.split('_|_')[0];
  return pureString;
};
