/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllLocations } from '../../components/Header/api-locations';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [isLocationEditable, setIsLocationEditable] = useState(false);

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
        <div
          className={`editButton ${
            isLocationEditable ? 'editButtonSelected' : ''
          }`}
          onClick={() => setIsLocationEditable(true)}
        >
          <p>Edit</p>
          <HiPencil />
        </div>
      </div>
      <ul>
        {locations.map((item, index) => (
          <div
            className={`locationRow ${
              isLocationEditable ? 'editableLocationRow' : ''
            }`}
          >
            <div className="locationName">{item.name}</div>
            <div>{item.address}</div>
          </div>
        ))}
      </ul>
      {isLocationEditable && (
        <div className="profileActionButton">
          <div
            className="editButton"
            onClick={() => {
              setIsLocationEditable(false);
            }}
          >
            Cancel
          </div>
          <button type="button" className="saveButton">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationManager;
