/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getSchedules = (location, startDate, endDate) => {
  console.log('Getting Schedules:', startDate, endDate);
  const from = startDate && new Date(startDate).toISOString();
  let to = endDate && new Date(endDate);
  if (endDate) {
    to.setDate(to.getDate() + 1);
    to = to.toISOString();
  }
  const query = `startDate=${from}&endDate=${to}`;
  const response = fetch(
    `${process.env.REACT_APP_PROXY}/api/schedule/${location}/getSchedule?${query}`
  )
    .then((data) => data.json())
    .catch((err) => ({
      err: `Error retrieving schedule ${err}`,
    }));
  console.log(response);
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { getSchedules };
