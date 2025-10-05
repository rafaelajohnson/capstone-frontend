// src/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function Home() {
  const { token } = useAuth();

  return (
    <section className="floating-box">
      <h1>Welcome to Choose Your Own Adventure!</h1>
      <p>
        This app lets you read and create interactive branching stories. Each
        page has multiple options—you decide what happens next.
      </p>

      {token ? (
        <p>
          🎉 You’re logged in!{" "}
          <Link to="/stories" className="button">
            View stories
          </Link>{" "}
          to begin.
        </p>
      ) : (
        <p>
          🚪 Please{" "}
          <Link to="/login" className="button">
            Log in
          </Link>{" "}
          or{" "}
          <Link to="/register" className="button">
            Create an account
          </Link>{" "}
          to start exploring.
        </p>
      )}
    </section>
  );
}
