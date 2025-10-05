// src/auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/** A form that lets new users create an account */
export default function Register() {
  const { register } = useAuth(); // use auth context register function
  const navigate = useNavigate(); // redirect after successful signup
  const [error, setError] = useState(null);

  // Handle form submission
  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await register({ username, password });
      navigate("/"); // back to home after signup
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="floating-box">
      <h1>Register for an account</h1>

      <form action={onRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button
          style={{
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            border: "none",
            borderRadius: "10px",
            color: "white",
            padding: "0.6rem 1.4rem",
            marginTop: "0.5rem",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 18px rgba(0, 150, 255, 0.4)",
          }}
        >
          Register
        </button>

        {error && (
          <output style={{ display: "block", marginTop: "1rem", color: "#ff6b6b" }}>
            {error}
          </output>
        )}
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <Link to="/register" className="button">
          Log in here
        </Link>
      </p>
    </div>
  );
}
