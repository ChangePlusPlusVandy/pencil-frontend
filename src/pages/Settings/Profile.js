/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useAuth } from '../../AuthContext';
import Modal from '../../components/Modal/Modal';

const Profile = () => {
  const { currentUser, changeDisplayName, changeEmail, reauthenticate } =
    useAuth();
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [username, setUsername] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  // tempUsername and tempEmail is used to update the values of input tags
  const [tempUsername, setTempUsername] = useState(currentUser.displayName);
  const [tempEmail, setTempEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    if (tempEmail !== currentUser.email) {
      // prompt user to enter password if email is changed
      setIsModalVisible(true);
      return;
    }
    // just change the display name, no need for modal
    changeDisplayName(tempUsername);
    setUsername(tempUsername);
    setEmail(tempEmail);
    setSuccess('Display name successfully changed');
    setIsProfileEditable(false);
  };

  const handleModalSave = async () => {
    setIsLoading(true);
    try {
      // reauthenticate first
      await reauthenticate(currentPassword);
      await changeEmail(tempEmail);
      await changeDisplayName(tempUsername);
    } catch (err) {
      setError(err.message);
      setSuccess('');
      setIsLoading(false);
      return;
    }

    setUsername(tempUsername);
    setEmail(tempEmail);
    setCurrentPassword('');
    setSuccess('Changes successfully saved');
    setError('');
    setIsProfileEditable(false);
    setIsModalVisible(false);
    setIsLoading(false);
  };

  const resetFields = () => {
    // reset display and email
    setTempUsername(username);
    setTempEmail(email);
  };

  const handleCancelChanges = () => {
    if (isProfileEditable) {
      resetFields();
    }
    setIsProfileEditable(!isProfileEditable);
  };

  return (
    <div className="settingsBody">
      <Modal
        show={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setCurrentPassword('');
        }}
        actionButtonText="Confirm"
        handleAction={handleModalSave}
        actionButtonDisabled={isLoading || currentPassword === ''}
      >
        <label className="inputLabel">
          Current password
          <input
            type="password"
            className="primaryInput"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        {error && <p className="errorMessage">{error}</p>}
      </Modal>
      <div className="profileColHeader">
        <h3>Edit Profile</h3>
        <div
          className={`secondaryButton vertical-align-center ${
            isProfileEditable ? 'selectedBlue' : ''
          }`}
          onClick={handleCancelChanges}
        >
          Edit
          <HiPencil />
        </div>
      </div>
      <div
        className={`${
          isProfileEditable
            ? 'profileInputContainer'
            : 'profileInputContainerDisabled'
        }`}
      >
        <div className="profileEntryTitle">
          Display name
          <input
            className="profileInput"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            disabled={!isProfileEditable}
          />
        </div>
        <div className="profileEntryTitle">
          Email
          <input
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            className="profileInput"
            disabled={!isProfileEditable}
          />
        </div>
      </div>
      {isProfileEditable && (
        <div className="profileActionButton">
          <div className="secondaryButton" onClick={handleCancelChanges}>
            Cancel
          </div>
          <button
            type="button"
            className="primaryButton"
            disabled={
              tempUsername === '' ||
              tempEmail === '' ||
              (tempUsername === currentUser.displayName &&
                tempEmail === currentUser.email)
            }
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      )}
      {success && <p className="successMessage">{success}</p>}
    </div>
  );
};
export default Profile;
