/* eslint-disable import/prefer-default-export */
import axios from '../../axios';

const getAllLocations = async () => {
  try {
    const response = await axios.get(`/location/locations`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createNewLocation = async (req) => {
  try {
    const response = await axios.post(`/location/create`, req);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateLocation = async (uuid, name, address) => {
  try {
    const response = await axios.put(`/location/update/${uuid}`, {
      uuid,
      name,
      address,
    });
    return response.data;
  } catch (err) {
    console.log('humdeedum');
    return Promise.reject(err);
  }
};

export { getAllLocations, createNewLocation, updateLocation };
