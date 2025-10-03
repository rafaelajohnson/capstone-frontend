// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

// Create context so the whole app can share auth state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Try to load token from sessionStorage when app starts
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Keep token in sync with sessionStorage (so refresh keeps you logged in)
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  /**
   * Register a new user.
   * Calls POST /auth/signup and stores the returned token.
   */
  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json(); // backend returns { user, token }

    if (!response.ok) {
      throw Error(result.message || "Failed to register");
    }

    // Store only the token, not the whole JSON
    setToken(result.token);
  };

  /**
   * Log in an existing user.
   * Calls POST /auth/login and stores the returned token.
   */
  const login = async (credentials) => {
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      throw Error(result.message || "Failed to login");
    }

    setToken(result.token);
  };

  /**
   * Log out user.
   * Clears token from state + sessionStorage.
   */
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  // Expose these values/functions to the app
  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for convenience
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
