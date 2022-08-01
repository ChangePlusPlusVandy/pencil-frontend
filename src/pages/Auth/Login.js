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
      await login(email, password)
        .then(() => history.push('/'))
        .catch((err) => {
          setError(err.message);
        });
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Log In</h1>
      <p className="authSubtitle">
        Welcome to the PENCIL Dashboard
        <br /> Please enter your email and password to get started
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            className="primaryInput margin-bottom-2"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          <div className="passwordLabelContainer">
            Password{' '}
            <Link
              to="/forgot-password"
              className="forgotPasswordButton"
              tabIndex={-1}
            >
              Forgot Password?
            </Link>
          </div>
          <PasswordInput
            className="primaryInput"
            value={password}
            onChange={setPassword}
          />
        </label>
        {error && <div className="errorMessage">{error}</div>}
        <button disabled={isLoading} type="submit" className="primaryButton">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p className="margin-top-1">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
