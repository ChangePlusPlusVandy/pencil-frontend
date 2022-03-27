/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import PasswordInput from '../../components/PasswordInput/PasswordInput';

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
      <h1>Log In</h1>
      <p className="authSubtitle">
        Welcome to the PENCIL Dashboard. Please enter your email and password to
        get started.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              className="primaryInput"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <div className="passwordLabelContainer">
              Password{' '}
              <Link to="/forgot-password" className="forgotPasswordButton">
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              className="primaryInput"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="primaryButton no-margin"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
