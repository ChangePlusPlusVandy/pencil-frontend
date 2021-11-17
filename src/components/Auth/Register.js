import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

/**
 * Allows user to register.
 * @return {Object} - Register page.
 * */
const Register = () => {
  const { register } = useAuth();
  const history = useHistory();

  const [name, setName] = useState(''); // name
  const [email, setEmail] = useState(''); // email
  const [password, setPassword] = useState(''); // password
  const [passwordConfirm, setPasswordConfirm] = useState(''); // password confirm
  const [error, setError] = useState(''); // error
  const [isLoading, setIsLoading] = useState(false); // is loading

  /**
   * Handles the registration process.
   * @param {Object} event - Event object.
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      await register(name, email, password);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="passwordConfirm">
            Confirm Password
            <input
              type="password"
              id="passwordConfirm"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
