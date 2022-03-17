/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useAuth } from '../../AuthContext';

const Profile = () => {
  const {
    currentUser,
    changeDisplayName,
    changePassword,
    changeEmail,
    reauthenticate,
  } = useAuth();
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [username, setUsername] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const checkPassword = async () => {
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
      setError('New password must be different from old password');
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

  const handleSave = () => {
    if (username !== currentUser.displayName) {
      changeDisplayName(username);
    }
    if (email !== currentUser.email) {
      changeEmail(email);
    }
    if (checkPassword()) {
      // if password change successful
      setIsProfileEditable(false);
    }
    setIsProfileEditable(false);
  };

  return (
    <div className="settingsBody">
      <div className="profileBody">
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Edit Profile</h3>
            <div
              className={`secondaryButton vertical-align-center ${
                isProfileEditable ? 'secondaryButtonSelected' : ''
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
        </div>
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Change Password</h3>
            <div
              className={`secondaryButton ${
                isPasswordEditable ? 'secondaryButtonSelected' : ''
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
              <input
                type="password"
                className="profileInput"
                disabled={!isPasswordEditable}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="profileEntryTitle">
              New password
              <input
                type="password"
                className="profileInput"
                disabled={!isPasswordEditable}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="profileEntryTitle">
              Confirm password
              <input
                type="password"
                className="profileInput"
                disabled={!isPasswordEditable}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Cancel and Save Buttons */}
          {(isPasswordEditable || isProfileEditable) && (
            <div className="profileActionButton">
              <div
                className="secondaryButton"
                onClick={() => {
                  setIsPasswordEditable(false);
                  setIsProfileEditable(false);
                }}
              >
                Cancel
              </div>
              <button
                type="button"
                className="primaryButton"
                disabled={
                  username === currentUser.displayName &&
                  email === currentUser.email &&
                  (currentPassword === '' ||
                    newPassword === '' ||
                    confirmPassword === '')
                }
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
          {error && <p className="profileError">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default Profile;
