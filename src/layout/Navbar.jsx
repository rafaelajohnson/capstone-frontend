// Layout wraps around all pages — handles nav + page container
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Layout() {
  const { token, logout } = useAuth();

  return (
    <>
      {/* 🌈 Floating glassy navbar */}
      <nav
        style={{
          position: "sticky",
          top: "0",
          zIndex: 100,
          background:
            "linear-gradient(90deg, rgba(0,255,179,0.6), rgba(0,204,255,0.6))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.25)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Comic Neue', 'Poppins', sans-serif",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ffffff",
            textShadow: "0 0 6px rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
        >
          🌟 Storybook Builder
        </Link>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/how-it-works">How it Works</NavLink>

          {token ? (
            <>
              <NavLink to="/stories">My Stories</NavLink>
              <button
                onClick={logout}
                style={{
                  background:
                    "linear-gradient(90deg, #ff8a65, #ff7043, #ff5722)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/register">Create Account</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* main body with a soft fade-in */}
      <main
        style={{
          padding: "3rem 2rem",
          minHeight: "80vh",
          color: "#fff",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Outlet />
      </main>

      {/* 🌙 soft footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          background:
            "linear-gradient(90deg, rgba(0,204,255,0.2), rgba(0,255,179,0.2))",
          fontSize: "0.9rem",
          color: "#cceeff",
          letterSpacing: "0.3px",
        }}
      >
        © 2025 Storybook Builder — Create, Imagine, Explore ✨
      </footer>
    </>
  );
}

/** Little helper for cleaner links + hover glow */
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        color: "#e0f7fa",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "1rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
      onMouseLeave={(e) => (e.target.style.color = "#e0f7fa")}
    >
      {children}
    </Link>
  );
}
