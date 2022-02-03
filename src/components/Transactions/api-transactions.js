/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getAllTransactions = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/form/transaction/transactions'
    );

    if (!response.json().body.error) {
      return response.json();
    }

    console.log('Error retrieving transactions');
    return { error: 'Error retrieving transactions' };
  } catch (err) {
    console.log(err);
    return { error: 'Teacher not found' };
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getAllTransactions };
