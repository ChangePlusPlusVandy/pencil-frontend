/* eslint-disable import/prefer-default-export */
const getAllLocations = async () => {
  try {
    const response = await fetch('/api/location/locations');
    return await response.json();
  } catch (err) {
    return err;
  }
};

const createNewLocation = async (req) => {
  try {
    const response = await fetch('/api/location/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

export { getAllLocations, createNewLocation };
