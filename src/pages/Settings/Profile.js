/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';

const Profile = () => {
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const displayName = 'Joel Wright';
  const email = 'joel.wright@pencil.org';

  return (
    <div className="settingsBody">
      <div className="profileBody">
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Edit Profile</h3>
            <div
              className={`editButton ${
                isProfileEditable ? 'editButtonSelected' : ''
              }`}
              onClick={() => setIsProfileEditable(true)}
            >
              <p>Edit</p>
              <HiPencil />
            </div>
          </div>
          <div className="profileEntryTitle">
            <p>Display name</p>
            <input
              value={displayName}
              className="profileInput"
              disabled={!isProfileEditable}
            />
          </div>
          <div className="profileEntryTitle">
            <p>Email</p>
            <input
              value={email}
              className="profileInput"
              disabled={!isProfileEditable}
            />
          </div>
        </div>
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Change Password</h3>
            <div
              className={`editButton ${
                isPasswordEditable ? 'editButtonSelected' : ''
              }`}
              onClick={() => setIsPasswordEditable(true)}
            >
              <p>Edit</p>
              <HiPencil />
            </div>
          </div>
          <div className="profileEntryTitle">
            <p>Current password</p>
            <input
              placeholder=""
              className="profileInput"
              disabled={!isPasswordEditable}
            />
          </div>
          <div className="profileEntryTitle">
            <p>New password</p>
            <input
              placeholder=""
              className="profileInput"
              disabled={!isPasswordEditable}
            />
          </div>
          <div className="profileEntryTitle">
            <p>Confirm password</p>
            <input
              placeholder=""
              className="profileInput"
              disabled={!isPasswordEditable}
            />
          </div>

          {/* Cancel and Save Buttons */}
          {(isPasswordEditable || isProfileEditable) && (
            <div className="profileActionButton">
              <div
                className="editButton"
                onClick={() => {
                  setIsPasswordEditable(false);
                  setIsProfileEditable(false);
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
      </div>
    </div>
  );
};
export default Profile;
