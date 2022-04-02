/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useAuth } from '../../AuthContext';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const Profile = () => {
  const { changePassword, reauthenticate } = useAuth();
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkPassword = async () => {
    setSuccess('');
    if (
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    ) {
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (currentPassword === newPassword) {
      setError('Current and new passwords are the same');
      return false;
    }
    try {
      await reauthenticate(currentPassword);
      await changePassword(newPassword);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleSave = async () => {
    if (await checkPassword()) {
      // if password change successful
      setError('');
      setSuccess('Password successfully changed');
      setIsPasswordEditable(false);
    }
  };

  return (
    <div className="settingsBody">
      <div className="profileColHeader">
        <h3>Change Password</h3>
        <div
          className={`secondaryButton vertical-align-center ${
            isPasswordEditable ? 'selectedBlue' : ''
          }`}
          onClick={() => setIsPasswordEditable(!isPasswordEditable)}
        >
          Edit
          <HiPencil />
        </div>
      </div>
      <div
        className={`${
          isPasswordEditable
            ? 'profileInputContainer'
            : 'profileInputContainerDisabled'
        }`}
      >
        <div className="profileEntryTitle">
          Current password
          <PasswordInput
            disabled={!isPasswordEditable}
            value={currentPassword}
            onChange={setCurrentPassword}
          />
        </div>
        <div className="profileEntryTitle">
          New password
          <PasswordInput
            disabled={!isPasswordEditable}
            value={newPassword}
            onChange={setNewPassword}
          />
        </div>
        <div className="profileEntryTitle">
          Confirm password
          <PasswordInput
            disabled={!isPasswordEditable}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>
      </div>

      {/* Cancel and Save Buttons */}
      {isPasswordEditable && (
        <div className="profileActionButton">
          <div
            className="secondaryButton"
            onClick={() => setIsPasswordEditable(false)}
          >
            Cancel
          </div>
          <button
            type="button"
            className="primaryButton"
            disabled={
              currentPassword === '' ||
              newPassword === '' ||
              confirmPassword === ''
            }
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      )}
      {error && <p className="errorMessage">{error}</p>}
      {success && <p className="successMessage">{success}</p>}
    </div>
  );
};
export default Profile;
