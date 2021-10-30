import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function register(name, email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return cred.user.updateProfile({
          displayName: name,
        });
      });
  }

  function logout() {
    return firebase.auth().signOut();
  }

  function getUser() {
    return firebase.auth().currentUser;
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
