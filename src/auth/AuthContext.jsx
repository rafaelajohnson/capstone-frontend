// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

// create a context to share auth state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // token is stored in memory and sessionStorage (so page refresh won’t log you out)
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    // anytime token changes, update sessionStorage
    if (token) {
      sessionStorage.setItem("token", token);
    }
  }, [token]);

  // register a new user with our backend
  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json(); // backend always sends JSON
    if (!response.ok) throw Error(result.error || "Signup failed");

    // backend returns { user, token } → we save just the token
    setToken(result.token);
  };

  // login an existing user
  const login = async (credentials) => {
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Login failed");

    setToken(result.token);
  };

  // clear token on logout
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  // expose all auth functions + token to children
  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// custom hook for easy access to auth state
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
