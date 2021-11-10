import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";

/**
 * Allows user to register.
 * @return {Object} - Register page.
 * */
const Register = () => {
  const { register } = useAuth();
  const history = useHistory();

  const [name, setName] = useState("");                        // name
  const [email, setEmail] = useState("");                      // email
  const [password, setPassword] = useState("");                // password
  const [passwordConfirm, setPasswordConfirm] = useState("");  // password confirm
  const [error, setError] = useState("");                      // error
  const [isLoading, setIsLoading] = useState(false);           // is loading

  /**
   * Handles the registration process.
   * @param {Object} event - Event object.
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      await register(name, email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
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
