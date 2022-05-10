/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllLocations } from '../../components/Header/api-locations';
import { useAuth } from '../../AuthContext';
import { updateLocation as apiUpdateLocation } from './api-settings';
import Error from '../../components/Error/Error';

const LocationManager = () => {
  const { currentLocation, updateLocation } = useAuth();
  const [locations, setLocations] = useState([]);
  const [localLocations, setLocalLocations] = useState([]);
  const [isLocationEditable, setIsLocationEditable] = useState(false);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  useEffect(() => {
    getAllLocations().then((data) => {
      setLocations(data);
      setLocalLocations(data);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        localLocations.map(async (location, i) => {
          await apiUpdateLocation(
            location.uuid,
            location.name,
            location.address
          );
          if (currentLocation === locations[i].name) {
            updateLocation(location.name);
          }
        })
      );
      setIsLocationEditable(false);
      setError('');
      setErrorDescription('');
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
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
    <>
      {error && (
        <Error
          error={error}
          description={errorDescription}
          setError={setError}
        />
      )}
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
            localLocations.map((item) => (
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
    </>
  );
};

export default LocationManager;
