// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const { API } = useApi() || {}; // we only need API here for raw fetch

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // --- Signup ---
  const register = async (credentials) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    if (!res.ok) throw Error(result.error || "Signup failed");

    setToken(result.token);
    return result;
  };

  // --- Login ---
  const login = async (credentials) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    if (!res.ok) throw Error(result.error || "Login failed");

    setToken(result.token);
    return result;
  };

  // --- Logout ---
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
