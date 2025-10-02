import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/** A form that lets an existing user log in */
export default function Login() {
  const { login } = useAuth(); // hook into auth context to call backend
  const navigate = useNavigate(); // redirect after successful login

  const [error, setError] = useState(null);

  // Handle form submission
  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      // Send credentials to backend /auth/login
      await login({ username, password });
      navigate("/"); // go back to homepage once logged in
    } catch (e) {
      setError(e.message); // show error if login fails
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      {/* form uses action instead of onSubmit, which plays nice with React Router */}
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
