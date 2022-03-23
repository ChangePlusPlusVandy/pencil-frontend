import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Router from './Router';
import './App.css';

/**
 * Root component of application.
 *
 * @returns {Object} - BrowserRouter with Router component.
 * */

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
