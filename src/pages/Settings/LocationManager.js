/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import {
  getAllLocations,
  updateLocation,
} from '../../components/Header/api-locations';

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [localLocations, setLocalLocations] = useState([]);
  const [isLocationEditable, setIsLocationEditable] = useState(false);

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
      setLocalLocations(data);
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localLocations.forEach((location) => {
      updateLocation(location.uuid, location.name, location.address);
    });
    setIsLocationEditable(false);
  };

  const handleChange = (e, uuid) => {
    const { name, value } = e.target;
    setLocalLocations((prevState) =>
      prevState.map((location) => {
        if (location.uuid === uuid) return { ...location, [name]: value };
        return location;
      })
    );
  };

  return (
    <div className="settingsBody">
      <div className="locationManagerHeader">
        <h3>Current Locations</h3>
        <div
          className={`secondaryButton vertical-align-center ${
            isLocationEditable ? 'selectedBlue' : ''
          }`}
          onClick={() => setIsLocationEditable(!isLocationEditable)}
        >
          Edit
          <HiPencil />
        </div>
      </div>
      <ul>
        {localLocations.length &&
          localLocations.map((item, index) => (
            <div className="locationRow">
              <div className="locationRowCol1">
                <input
                  className="editableText"
                  disabled={!isLocationEditable}
                  name="name"
                  value={item.name}
                  onChange={(e) => handleChange(e, item.uuid)}
                />
              </div>
              <div className="locationRowCol2">
                <input
                  className="editableText"
                  disabled={!isLocationEditable}
                  name="address"
                  value={item.address}
                  onChange={(e) => handleChange(e, item.uuid)}
                />
              </div>
            </div>
          ))}
      </ul>
      {isLocationEditable && (
        <div className="profileActionButton">
          <div
            className="secondaryButton"
            onClick={() => {
              setIsLocationEditable(false);
              setLocalLocations(locations);
            }}
          >
            Cancel
          </div>
          <button
            type="button"
            className="primaryButton"
            onClick={handleSave}
            disabled={locations === localLocations}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationManager;
