const getAllSchools = async () => {
  try {
    const response = await fetch(`api/school`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addSchool = async (data) => {
  try {
    const response = await fetch(`api/school/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name: data }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getAllSchools, addSchool };
