/* eslint-disable import/prefer-default-export */
const getAllLocations = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/location/locations`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const createNewLocation = async (req) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/location/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      }
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const updateLocation = async (uuid, name, address) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/location/update/${uuid}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid, name, address }),
      }
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

export { getAllLocations, createNewLocation, updateLocation };
