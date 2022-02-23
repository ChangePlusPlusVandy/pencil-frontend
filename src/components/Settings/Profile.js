import React from 'react';
import { HiPencil } from 'react-icons/hi';

const Profile = () => {
  const a = 0;
  return (
    <div className="settingsBody">
      <div className="profileBody">
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Edit Profile</h3>
            <div className="editButton">
              <p>Edit</p>
              <HiPencil />
            </div>
          </div>
          <div className="profileEntryTitle">
            <p>Display name</p>
            <input placeholder="Joel Wright" className="" />
          </div>
          <div className="profileEntryTitle">
            <p>Email</p>
            <input placeholder="joel.wright@pencil.org" className="" />
          </div>
        </div>
        <div className="profileCol">
          <div className="profileColHeader">
            <h3>Change Password</h3>
            <div className="editButton">
              <p>Edit</p>
              <HiPencil />
            </div>
          </div>
          <div className="profileEntryTitle">
            <p>Current password</p>
            <input placeholder="" className="" />
          </div>
          <div className="profileEntryTitle">
            <p>New password</p>
            <input placeholder="" className="" />
          </div>
          <div className="profileEntryTitle">
            <p>Confirm password</p>
            <input placeholder="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
