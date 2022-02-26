import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllLocations } from '../../components/Header/api-locations';

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
    <div className="settingsBody">
      <div className="locationManagerHeader">
        <h3>Current Locations</h3>
        <div className="editButton">
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
