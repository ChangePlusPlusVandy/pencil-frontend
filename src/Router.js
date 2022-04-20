import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';

// Routes
import Profile from './pages/Auth/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import Transactions from './pages/Transactions/Transactions';
import Schedule from './pages/Schedule/Schedule';
import Settings from './pages/Settings/Settings';
import Reports from './pages/Reports/Reports';
import Authentication from './pages/Auth/Authentication';
import NotFound from './pages/404';

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
    <Route exact path="/login" component={Authentication} />
    <Route exact path="/register" component={Authentication} />
    <Route exact path="/forgot-password" component={Authentication} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/inventory" component={Inventory} />
    <PrivateRoute exact path="/reports" component={Reports} />
    <PrivateRoute exact path="/transactions" component={Transactions} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/schedule" component={Schedule} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Router;
