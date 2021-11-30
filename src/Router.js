import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Routes
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';

/**
 * Router for dashboard.
 *
 * @returns {Object} - Switch router for all url paths.
 * */
const Router = () => (
  <AuthProvider>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/inventory" component={Inventory} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  </AuthProvider>
);

export default Router;
