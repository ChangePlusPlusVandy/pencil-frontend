import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllLocations } from '../Header/api-locations';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);

  const parseLocationObjectToArray = (locationObj) =>
    Object.keys(locationObj).map((key) => locationObj[key]);

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  return (
    <div className="locationManager">
      <div className="locationManagerHeader">
        <h2>Current Locations</h2>
        <div className="locationButton">
          <p>Edit</p>
          <HiPencil />
        </div>
      </div>
      <ul>
        {locations.map((item, index) => (
          <div className="locationRow">
            <div className="locationName">{item.name}</div>
            <div>{item.address}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LocationManager;
