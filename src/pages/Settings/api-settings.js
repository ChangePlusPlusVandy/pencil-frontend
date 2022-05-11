import axios from '../../axios';

const getAllSchools = async () => {
  try {
    const response = await axios.get(`/school`);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const addSchool = async (data) => {
  try {
    const response = await axios.post(`/school/create`, { name: data });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateSchool = async (uuid, name, address) => {
  try {
    const response = await axios.put(`/school/update/`, {
      uuid,
      name,
      address,
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateLocation = async (uuid, name, address) => {
  try {
    const response = await axios.put(`/location/update`, {
      uuid,
      name,
      address,
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getAllSchools, addSchool, updateSchool, updateLocation };
