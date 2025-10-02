import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/** Login form – lets existing users sign in */
export default function Login() {
  const { login } = useAuth(); // grab login fn from context
  const navigate = useNavigate(); // redirect after login

  const [error, setError] = useState(null);

  // called when form is submitted
  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password }); // call backend
      navigate("/"); // send to home page on success
    } catch (e) {
      setError(e.message); // capture error to display
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={onLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
