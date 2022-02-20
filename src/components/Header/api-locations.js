/* eslint-disable import/prefer-default-export */
const getAllLocations = async () => {
  try {
    const response = await fetch('/api/location/locations');
    return await response.json();
  } catch (err) {
    return err;
  }
};

export { getAllLocations };
