import axios from '../../axios';

/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getSchedules = (location, startDate, endDate) => {
  const from = startDate && new Date(startDate).toISOString();
  let to = endDate && new Date(endDate);
  if (endDate) {
    to.setDate(to.getDate() + 1);
    to = to.toISOString();
  }
  const query = `startDate=${from}&endDate=${to}`;
  const reqUrl =
    from && to
      ? `/schedule/${location}/getSchedule?${query}`
      : `/schedule/${location}/getSchedule`;
  const response = axios
    .get(reqUrl)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { getSchedules };
