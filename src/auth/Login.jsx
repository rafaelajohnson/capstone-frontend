import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/**
 * Simple login form that calls our backend's /auth/login route.
 * If login works, the user gets redirected to the homepage.
 * If it fails, we show the error message right on the page.
 */
export default function Login() {
  const { login } = useAuth(); // grab login function from context
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // handle the login form submission
  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      // call the login function (this talks to /auth/login)
      await login({ username, password });
      navigate("/"); // send user back to home after successful login
    } catch (e) {
      // if the backend throws, we catch and show it
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>

      {/* by using form action, React Router handles the form event */}
      <form action={onLogin}>
        <label>
          Username
          {/* type="text" is fine, "username" isn't a valid input type */}
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {/* show errors inline, makes it clear to the user what went wrong */}
        {error && <output>{error}</output>}
      </form>

      {/* link to register page in case user doesn't have an account */}
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}