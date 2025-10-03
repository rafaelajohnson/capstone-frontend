// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

// Context is like a box we pass around to share login state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Store token in state (and reload from sessionStorage on refresh)
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Whenever token changes, also save/remove it in sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // --- Register a new user ---
  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // backend sends back { user, token }
    const result = await response.json();

    if (!response.ok) {
      // if backend sends { error: "..."} we show it
      throw Error(result.error || "Failed to register");
    }

    // save the token so ApiContext can attach it to future requests
    setToken(result.token);
  };

  // --- Log in existing user ---
  const login = async (credentials) => {
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // backend sends back { user, token }
    const result = await response.json();

    if (!response.ok) {
      throw Error(result.error || "Failed to login");
    }

    setToken(result.token);
  };

  // --- Log out user ---
  const logout = () => {
    setToken(null); // clear from memory
    sessionStorage.removeItem("token"); // clear from browser storage
  };

  // everything the app needs about auth
  const value = { token, register, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// custom hook so components can use auth easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
