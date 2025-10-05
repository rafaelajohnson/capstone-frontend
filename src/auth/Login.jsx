// src/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/** A form that lets an existing user log in */
export default function Login() {
  const { login } = useAuth(); // same context hook
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="floating-box">
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

      <p style={{ marginTop: "1rem" }}>
        Need an account?{" "}
        <Link to="/register" className="button">
          Register here
        </Link>
      </p>
    </div>
  );
}
