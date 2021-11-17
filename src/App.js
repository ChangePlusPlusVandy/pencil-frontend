import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

/**
 * Root component of application.
 *
 * @returns {Object} - BrowserRouter with Router component.
 * */
const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
