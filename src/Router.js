import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

// Routes
import Home from "./Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Profile";

const Router = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </AuthProvider>
  );
};

export default Router;
