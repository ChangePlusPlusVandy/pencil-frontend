/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getSchedules = async (location) => {
  try {
    const response = await fetch(
      `https://localhost:8080/api/schedule/getSchedule/${location}`
    );

    if (!response.json().body.error) {
      return response.json();
    }

    console.log('Error retrieving schedule');
    return { error: 'Error retrieving schedule' };
  } catch (err) {
    console.log(err);
    return { error: 'Location schedule not found', err };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getSchedules };
