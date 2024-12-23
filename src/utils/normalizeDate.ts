type Format = 'DD-MM-YY' | 'MM-YY' | 'YY' | 'MM' | 'DD;';

const normalizeDate = (date: Date, format?: Format) => {
  if (!date) return date;
  const newDate = new Date(date).toISOString();
  const splitDate = newDate.split('T')[0];
  const [year, month, day] = splitDate.split('-');
  return format === 'DD-MM-YY'
    ? `${day}-${month}-${year}`
    : format === 'MM-YY'
    ? `${month}-${year}`
    : newDate;
};

export default normalizeDate;
