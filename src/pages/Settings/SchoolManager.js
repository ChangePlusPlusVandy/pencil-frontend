/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { getAllSchools, addSchool } from './api-settings';
import Modal from '../../components/Modal/Modal';

const SchoolManager = () => {
  const [schools, setSchools] = useState([]);
  const [localSchools, setLocalSchools] = useState([]);
  const [isSchoolEditable, setIsSchoolEditable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');

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

  const handleModalSave = () => {
    addSchool(newSchoolName).then((data) => {
      setSchools([...schools, data]);
      setLocalSchools([...localSchools, data]);
      setNewSchoolName('');
      setIsModalVisible(false);
    });
  };

  return (
    <div className="settingsBody">
      <Modal
        show={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setNewSchoolName('');
        }}
        actionButtonText="Add"
        handleAction={handleModalSave}
        actionButtonDisabled={newSchoolName === ''}
      >
        <label className="inputLabel">
          New School Name
          <input
            type="text"
            className="primaryInput"
            value={newSchoolName}
            onChange={(e) => setNewSchoolName(e.target.value)}
          />
        </label>
      </Modal>
      <div className="locationManagerHeader">
        <h3>Current Schools</h3>
        <div
          className="secondaryButton"
          onClick={() => setIsModalVisible(true)}
        >
          Add School
        </div>
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
