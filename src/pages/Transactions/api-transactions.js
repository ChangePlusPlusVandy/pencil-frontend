const getPendingTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/pending?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getApprovedTransactions = async (
  location,
  perpage = 10,
  previous = 0
) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/approved?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getDeniedTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/denied?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getTransactions = async (location, type, previous = 0, perpage = 10) => {
  if (type === 'Pending')
    return getPendingTransactions(location, perpage, previous);
  if (type === 'Approved')
    return getApprovedTransactions(location, perpage, previous);
  if (type === 'Denied')
    return getDeniedTransactions(location, perpage, previous);
  return false;
};

const approveTransaction = async (location, uuid) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/approve/${uuid}`,
      {
        method: 'POST',
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher not found' };
  }
};

const denyTransaction = async (location, uuid) => {
  try {
    const response = await fetch(`/api/${location}/transaction/deny/${uuid}`, {
      method: 'POST',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher not found' };
  }
};

const handleTransaction = async (location, uuid, action) => {
  if (action === 'Approve') return approveTransaction(location, uuid);
  if (action === 'Deny') return denyTransaction(location, uuid);
  return false;
};

// eslint-disable-next-line import/prefer-default-export
export {
  getPendingTransactions,
  approveTransaction,
  denyTransaction,
  getApprovedTransactions,
  getDeniedTransactions,
  getTransactions,
  handleTransaction,
};

// const getAllTransactions = async (location) => {
//   try {
//     const response = await fetch(
//       `/api/${location}/form/transaction/transactions`
//     );

//     if (!response.json().body.error) {
//       return await response.json();
//     }
//     console.log('Error retrieving transactions');
//     return { error: 'Error retrieving transactions' };
//   } catch (err) {
//     console.log(err);
//     return { error: 'Teacher not found' };
//   }
// };
