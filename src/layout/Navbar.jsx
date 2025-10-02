import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/**
 * Navbar shows links at the top of every page.
 * It changes depending on whether the user is logged in.
 */
export default function Navbar() {
  const { token, logout } = useAuth(); 
  // token = are we logged in? 
  // logout = clears token + session so user is out

  return (
    <header id="navbar">
      {/* Brand logo/name always links back to home */}
      <NavLink id="brand" to="/">
        <p>Frontend Template</p>
      </NavLink>

      <nav>
        {token ? (
          // if logged in → show logout button
          <button onClick={logout}>Log out</button>
        ) : (
          // if not logged in → show login link
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}

