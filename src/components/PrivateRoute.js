import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

/**
 * Checks if user is authorized and redirects to login page if not.
 * @return {Object} - Logic for protected routes.
 * */
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
