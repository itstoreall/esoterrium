const normalizeDate = (date: Date) => {
  if (!date) return date;
  const newDate = new Date(date).toISOString();
  const splitDate = newDate.split('T')[0];
  const [year, month, day] = splitDate.split('-');
  return `${day}-${month}-${year}`;
};

export default normalizeDate;
