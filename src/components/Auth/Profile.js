import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

/**
 * Allows user to view their profile information.
 * @return {Object} - Profile page
 * */
const Profile = () => {
  const { logout, getUser } = useAuth();
  const history = useHistory();

  const [user, setUser] = useState(null); // User object.
  const [isLoading, setIsLoading] = useState(true); // Loading state.

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, []);

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
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
