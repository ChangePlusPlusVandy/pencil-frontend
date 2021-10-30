import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Routes
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import ForgotPassword from "./components/Auth/ForgotPassword";

const Router = () => {
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  );
};

export default Router;
