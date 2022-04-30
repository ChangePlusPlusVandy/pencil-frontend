import axios from '../../axios';

const DEF_PER_PAGE = 10;
const DEF_PREVIOUS = 0;

const getPendingTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const reqUrl =
      perPage === DEF_PER_PAGE && previous === DEF_PREVIOUS
        ? `/${location}/transaction/pending`
        : `/${location}/transaction/pending?perPage=${perPage}&previous=${previous}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    return { error };
  }
};

const getApprovedTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/approved?perPage=${perPage}&previous=${previous}`
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const getVerifiedSchools = async () => {
  try {
    const response = await axios.get(`/school/verified`);

    return response.data;
  } catch (error) {
    return { error };
  }
};

const getDeniedTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/denied?perPage=${perPage}&previous=${previous}`
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const getTransactions = async (
  location,
  type,
  previous = DEF_PREVIOUS,
  perPage = DEF_PER_PAGE
) => {
  if (type === 'Pending')
    return getPendingTransactions(location, perPage, previous);
  if (type === 'Approved')
    return getApprovedTransactions(location, perPage, previous);
  if (type === 'Denied')
    return getDeniedTransactions(location, perPage, previous);
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
