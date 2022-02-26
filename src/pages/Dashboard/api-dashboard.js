/* eslint-disable consistent-return */
const getTransactions = async () => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/form/transaction/transactions'
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const approveTransaction = async (data) => {
  try {
    const response = await fetch(
      'http://localhost:8080/api/form/transaction/approve',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const denyTransaction = async (data) => {
  // TODO: fix the URI here
  try {
    const response = await fetch(
      'http://localhost:8080/api/form/transaction/deny',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getTransactions, approveTransaction, denyTransaction };
