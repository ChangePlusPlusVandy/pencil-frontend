import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';

// Routes
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import Transactions from './pages/Transactions/Transactions';
import Schedule from './pages/Schedule/Schedule';
import Settings from './pages/Settings/Settings';
import Reports from './pages/Reports/Reports';

/**
 * Router for dashboard.
 *
 * @returns {Object} - Switch router for all url paths.
 * */
const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard}>
      <Redirect to="/dashboard" />
    </PrivateRoute>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/inventory" component={Inventory} />
    <PrivateRoute exact path="/reports" component={Reports} />
    <PrivateRoute exact path="/transactions" component={Transactions} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/schedule" component={Schedule} />
    <PrivateRoute exact path="/settings" component={Settings} />
  </Switch>
);

export default Router;
