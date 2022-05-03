import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/named
import { useAuth } from '../../AuthContext';

/**
 * Allows user to view their profile information.
 * @return {Object} - Profile page
 * */
const Profile = () => {
  const { logout, getUser, changePassword } = useAuth();
  const history = useHistory();
  const firstPassword = useRef(null);
  const secondPassword = useRef(null);

  const [user, setUser] = useState(null); // User object.
  const [canConfirm, setConfirm] = useState(false);
  const [error, setError] = useState(''); // error
  const [isLoading, setIsLoading] = useState(true); // is loading

  // Get user data
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, []);

  // Ensure that the passwords match
  const change = () => {
    if (firstPassword.current.value === secondPassword.current.value) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  /** Handle password change
   * @param e: object - event
   * */
  const changeThePassword = async (event) => {
    event.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      await changePassword(firstPassword.current.value);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  /**
   * Logs user out and redirects them to home.
   * */
  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <form onSubmit={changeThePassword}>
            <p>Change password</p>
            <input
              type="text"
              id="changepassword"
              name="changepassword"
              onChange={change}
              ref={firstPassword}
            />
            <br />
            <p>Confirm password:</p>
            <input
              type="text"
              id="confirmpassword"
              name="confirmpassword"
              onChange={change}
              ref={secondPassword}
            />
            <br />
            {canConfirm ? (
              <button type="submit">Change Password</button>
            ) : (
              <button type="submit" disabled>
                {isLoading ? 'Loading...' : 'Change Password'}
              </button>
            )}
          </form>
          <br />
          {error && <p>{error}</p>}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <br />
          <Link to="/">Back</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
