import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header/Header';

import Router from './Router';
import Menu from './components/Menu/Menu';
/**
 * Root component of application.
 *
 * @returns {Object} - BrowserRouter with Router component.
 * */

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Menu />
      <Router />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
