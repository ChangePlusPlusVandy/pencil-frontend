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
  const [currentLocation, setCurrentLocation] = useState(
    sessionStorage.getItem('location')
  );

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
   * Allows user to reset password with email.
   * @param {Object} {email} - Email of user.
   * @return {Object} - User object.
   * */
  function forgotPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Allows user to update password with new password.
   * @param {Object} {password} - New password of user.
   * @return {Object} - User object.
   * */
  function changePassword(newPassword) {
    return firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        console.log('Changed password');
      });
  }

  /**
   * Allows user to update display name with new display name.
   * @param {Object} {displayName} - New display name of user.
   * @return {Object} - User object.
   * */
  function changeDisplayName(newDisplayName) {
    return firebase
      .auth()
      .currentUser.updateProfile({
        displayName: newDisplayName,
      })
      .then(() => {
        console.log('Changed display name');
      });
  }

  /**
   * Allows user to update email with new email.
   * @param {Object} {email} - New email of user.
   * @return {Object} - User object.
   * */
  function changeEmail(newEmail) {
    return firebase
      .auth()
      .currentUser.updateEmail(newEmail)
      .then(() => {
        console.log('Changed email');
      });
  }

  /**
   * Updates current location.
   * @param string - name of new location.
   */
  function updateLocation(location) {
    setCurrentLocation(location);
    sessionStorage.setItem('location', location);
  }

  /**
   * Reauthenticates user with password.
   * @param string - current password of user
   */
  function reauthenticate(password) {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return user.reauthenticateWithCredential(cred);
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
      currentLocation,
      login,
      register,
      logout,
      forgotPassword,
      changePassword,
      changeDisplayName,
      changeEmail,
      updateLocation,
      reauthenticate,
    }),
    [
      currentUser,
      currentLocation,
      login,
      register,
      logout,
      forgotPassword,
      changePassword,
      changeDisplayName,
      changeEmail,
      updateLocation,
      reauthenticate,
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
