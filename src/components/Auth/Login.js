import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";

/**
 * Allows user to log in to the application.
 * @return {Object} - Login page.
 * */
const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");            // Email of user.
  const [password, setPassword] = useState("");      // Password of user.
  const [isLoading, setIsLoading] = useState(false); // Is the login process in progress?
  const [error, setError] = useState("");            // Error message.

  /**
   * Handles the login process.
   * @param {Object} event - Event object.
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot your password? <Link to="/forgot-password">Reset</Link>
      </p>
    </div>
  );
};

export default Login;
