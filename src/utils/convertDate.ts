const convertDate = (timestamp: Date) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default convertDate;
