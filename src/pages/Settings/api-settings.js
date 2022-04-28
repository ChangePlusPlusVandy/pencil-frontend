import axios from '../../axios';

const getAllSchools = async () => {
  try {
    const response = await axios.get(`/school`);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addSchool = async (data) => {
  try {
    const response = await axios.post(`/school/create`, { name: data });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getAllSchools, addSchool };
