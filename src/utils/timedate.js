// date manipulation function
export const getWeekDay = (dateObject) => {
  const dayNumber = dateObject.getDay();
  if (
    dateObject.getDate() === new Date().getDate() &&
    dateObject.getMonth() === new Date().getMonth &&
    dateObject.getFullYear() === new Date().getFullYear()
  ) {
    return 'Today';
  }

  switch (dayNumber) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tues';
    case 3:
      return 'Wed';
    case 4:
      return 'Thurs';
    case 5:
      return 'Fri';
    case 6:
      return 'Sun';
    default:
      return 'Error';
  }
};

export const getMonthName = (dateObject) => {
  const monthNumber = dateObject.getMonth();
  switch (monthNumber) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sept';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return 'Error';
  }
};

/**
 * Date object parser - parses all the important information from a date object
 * @param {Object} dateObject - date object
 * @returns parsed object with date, month, year, day, hour, minute, second, ampmTime
 */
export const parseDate = (dateObject) => ({
  date: dateObject.getDate(),
  month: getMonthName(dateObject),
  year: dateObject.getFullYear(),
  day: getWeekDay(dateObject),
  hour: dateObject.getHours(),
  minute: dateObject.getMinutes(),
  second: dateObject.getSeconds(),
  ampmTime: dateObject.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }),
});

/**
 * Date formatter function
 * @param {Object} dateObj - date object
 * @returns formatted date string in format: "5 Jan 2020"
 */
export const formatDateDMY = (dateObj) => {
  const { date, month, year } = parseDate(dateObj);

  return `${date} ${month} ${year}`;
};
