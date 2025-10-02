import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/** Registration form – lets a new user sign up */
export default function Register() {
  const { register } = useAuth(); // grab the register fn from our context
  const navigate = useNavigate(); // we’ll use this to redirect after signup

  // I’m keeping track of error messages in state, so if backend fails I can show user
  const [error, setError] = useState(null);

  // this will run when the form is submitted
  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      // actually call the backend via our context fn
      await register({ username, password });
      navigate("/"); // if success, send them to home page
    } catch (e) {
      // store the error so we can show it below the form
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      {/* action={onRegister} is a React Router trick so I don’t have to handle preventDefault manually */}
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
        {/* if something went wrong, show error here */}
        {error && <output>{error}</output>}
      </form>
      {/* link for users who already have an account */}
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
