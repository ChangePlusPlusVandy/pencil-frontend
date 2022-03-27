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
  const [currentPassword, setCurrentPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    if (email !== currentUser.email) {
      setIsModalVisible(true);
      return;
    }
    // just change the display name, no need for modal
    changeDisplayName(username);
    setSuccess('Display name successfully changed');
    setIsProfileEditable(false);
  };

  const handleModalSave = async () => {
    setIsLoading(true);
    try {
      // reauthenticate first
      await reauthenticate(currentPassword);
      await changeEmail(email);
    } catch (err) {
      setError(err.message);
      setSuccess('');
      setIsLoading(false);
      return;
    }

    setCurrentPassword('');
    setSuccess('Email successfully changed');
    setError('');
    setIsProfileEditable(false);
    setIsModalVisible(false);
    setIsLoading(false);
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
        {error && <p className="profileError">{error}</p>}
      </Modal>
      <div className="profileColHeader">
        <h3>Edit Profile</h3>
        <div
          className={`secondaryButton vertical-align-center ${
            isProfileEditable ? 'selectedBlue' : ''
          }`}
          onClick={() => setIsProfileEditable(!isProfileEditable)}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isProfileEditable}
          />
        </div>
        <div className="profileEntryTitle">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="profileInput"
            disabled={!isProfileEditable}
          />
        </div>
      </div>
      {isProfileEditable && (
        <div className="profileActionButton">
          <div
            className="secondaryButton"
            onClick={() => setIsProfileEditable(false)}
          >
            Cancel
          </div>
          <button
            type="button"
            className="primaryButton"
            disabled={
              username === '' ||
              email === '' ||
              (username === currentUser.displayName &&
                email === currentUser.email)
            }
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      )}
      {success && <p className="profileSuccess">{success}</p>}
    </div>
  );
};
export default Profile;
