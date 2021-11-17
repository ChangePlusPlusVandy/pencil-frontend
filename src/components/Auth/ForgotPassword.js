import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

/**
 * Allows the user to reset their password.
 * @return {Object} - Page to reset password
 * */
const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState(''); // Email address
  const [error, setError] = useState(''); // Error message
  const [message, setMessage] = useState(''); // Success message

  /**
   * Handles the submission of the password reset form.
   * @param {Object} event - Event object
   * */
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    forgotPassword(email)
      .then(() => {
        setMessage('Check your email for a reset link');
        setEmail('');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      <p>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
