import axios from '../../axios';

const getPendingTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/pending?perPage=${perpage}&previous=${previous}`
    );
    console.log(response);
    return response.data;
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
    const response = await axios.get(
      `/${location}/transaction/approved?perPage=${perpage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const getVerifiedSchools = async () => {
  try {
    const response = await axios.get(`/school/verified`);

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const getDeniedTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/denied?perPage=${perpage}&previous=${previous}`
    );
    return response.data;
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
    const response = await axios.post(
      `/${location}/transaction/approve/${uuid}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const denyTransaction = async (location, uuid) => {
  try {
    const response = await axios.post(`/${location}/transaction/deny/${uuid}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const handleTransaction = async (location, uuid, action) => {
  if (action === 'Approve') return approveTransaction(location, uuid);
  if (action === 'Deny') return denyTransaction(location, uuid);
  return false;
};

const approveDeniedTransaction = async (location, uuid, items) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approveDenied/${uuid}`,
      { items }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const approveTransactionWithNewSchool = async (location, uuid, schoolName) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approve/${uuid}?newSchool=1`,
      { schoolName }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const approveDeniedTransactionWithNewSchool = async (
  location,
  uuid,
  items,
  schoolName
) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approveDenied/${uuid}?newSchool=1`,
      { schoolName, items }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getPendingTransactions,
  approveTransaction,
  denyTransaction,
  approveDeniedTransaction,
  getApprovedTransactions,
  getDeniedTransactions,
  getTransactions,
  handleTransaction,
  getVerifiedSchools,
  approveDeniedTransactionWithNewSchool,
  approveTransactionWithNewSchool,
};
