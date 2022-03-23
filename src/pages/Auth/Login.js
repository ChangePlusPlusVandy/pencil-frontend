import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Header from '../../components/Header/Header';

/**
 * Allows user to log in to the application.
 * @return {Object} - Login page.
 * */
const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState(''); // Email of user.
  const [password, setPassword] = useState(''); // Password of user.
  const [isLoading, setIsLoading] = useState(false); // Is the login process in progress?
  const [error, setError] = useState(''); // Error message.

  /**
   * Handles the login process.
   * @param {Object} event - Event object.
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot your password? <Link to="/forgot-password">Reset</Link>
      </p>
    </div>
  );
};

export default Login;
