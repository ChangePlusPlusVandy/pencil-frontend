import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header/Header';

import Router from './Router';

/**
 * Root component of application.
 *
 * @returns {Object} - BrowserRouter with Router component.
 * */

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Router />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
