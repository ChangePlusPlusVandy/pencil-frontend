/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllSchools, addSchool } from './api-settings';

const SchoolManager = () => {
  const [schools, setSchools] = useState([]);
  const [localSchools, setLocalSchools] = useState([]);
  const [isSchoolEditable, setIsSchoolEditable] = useState(false);

  useEffect(() => {
    getAllSchools().then((data) => {
      setSchools(data);
      setLocalSchools(data);
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSchoolEditable(false);
  };

  const handleChange = (e, uuid) => {
    const { name, value } = e.target;
    setLocalSchools((prevState) =>
      prevState.map((school) => {
        if (school.uuid === uuid) return { ...school, [name]: value };
        return school;
      })
    );
  };

  return (
    <div className="settingsBody">
      <div className="locationManagerHeader">
        <h3>Current Schools</h3>
        <div className="secondaryButton">Add School</div>
        <div
          className={`secondaryButton vertical-align-center ${
            isSchoolEditable ? 'selectedBlue' : ''
          }`}
          onClick={() => setIsSchoolEditable(!isSchoolEditable)}
        >
          Edit
          <HiPencil />
        </div>
      </div>
      <ul>
        {localSchools.length &&
          localSchools.map((item, index) => (
            <div className="locationRow">
              <input
                className="editableText"
                disabled={!isSchoolEditable}
                name="name"
                value={item.name}
                onChange={(e) => handleChange(e, item.uuid)}
              />
            </div>
          ))}
      </ul>
      {isSchoolEditable && (
        <div className="profileActionButton">
          <div
            className="secondaryButton"
            onClick={() => {
              setIsSchoolEditable(false);
              setLocalSchools(schools);
            }}
          >
            Cancel
          </div>
          <button
            type="button"
            className="primaryButton"
            onClick={handleSave}
            disabled={schools === localSchools}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SchoolManager;
