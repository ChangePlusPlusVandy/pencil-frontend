import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Routes
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory/Inventory';
import Transactions from './components/Transactions/Transactions';
import Schedule from './components/Schedule/Schedule';

/**
 * Router for dashboard.
 *
 * @returns {Object} - Switch router for all url paths.
 * */
const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/inventory" component={Inventory} />
    <PrivateRoute exact path="/transactions" component={Transactions} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/schedule" component={Schedule} />
  </Switch>
);

export default Router;
