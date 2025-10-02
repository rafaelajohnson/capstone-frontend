// src/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/**
 * Registration form that calls our backend's /auth/signup route.
 * On success we log the user in automatically (store token)
 * and send them back to the homepage.
 */
export default function Register() {
  const { register } = useAuth(); // grab register function from context
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // handle the register form submission
  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      // call register from context (talks to /auth/signup)
      await register({ username, password });
      navigate("/"); // redirect home after successful signup
    } catch (e) {
      // catch API errors and show them inline
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>

      {/* router form automatically wires formData into our handler */}
      <form action={onRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {/* show backend error if something fails (e.g. duplicate username) */}
        {error && <output>{error}</output>}
      </form>

      {/* give users a way to switch to login if they already have an account */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
