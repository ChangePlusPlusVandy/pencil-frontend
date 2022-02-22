import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
} from 'react';
import firebase from './firebase';

const AuthContext = createContext();

/**
 * Allows for context to be imported in a page.
 *
 * @returns {Object} - The context object.
 * */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Main functionality for AuthProvider.
 * @param {Object} {children} - Children helpers/state of component.
 * @returns {Object} - Created context with children helpers/states.
 * */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState();

  /**
   * Logs the user in with Firebase auth.
   * @param {Object} {email} - Email of user.
   * @param {Object} {password} - Password of user.
   * @return {Object} - User object.
   * */
  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Registers new user with Firebase auth.
   * @param {Object} {name} - Name of user.
   * @param {Object} {email} - Email of user.
   * @param {Object} {password} - Password of user.
   * @return {Object} - User object.
   * */
  function register(name, email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) =>
        cred.user.updateProfile({
          displayName: name,
        })
      );
  }

  /**
   * Logs the user out with Firebase auth.
   * @return {Object} - User object.
   * */
  function logout() {
    return firebase.auth().signOut();
  }

  /**
   * Checks if user is logged in with Firebase auth and gets credentials.
   * @return {Object} - User object.
   * */
  function getUser() {
    return firebase.auth().currentUser;
  }

  /**
   * Allows user to change password with email.
   * @param {Object} {email} - Email of user.
   * @return {Object} - User object.
   * */
  function forgotPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  function changePassword(newPassword) {
    return firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        console.log('Changed password');
      });
  }

  /**
   * Updates current location.
   * @param string - name of new location.
   */
  function updateLocation(location) {
    setCurrentLocation(location);
  }

  /**
   * returns current location.
   * @returns string - current location.
   */
  function getCurrentLocation() {
    return currentLocation;
  }

  useEffect(() => {
    /**
     * Updates user information in different parts of authentication.
     * @param {Object} {user} - User credentials.
     * @return {Object} - Function for cleanup.
     * */
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      login,
      register,
      logout,
      getUser,
      forgotPassword,
      changePassword,
      updateLocation,
      getCurrentLocation,
    }),
    [
      currentUser,
      login,
      register,
      logout,
      getUser,
      forgotPassword,
      updateLocation,
      getCurrentLocation,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
