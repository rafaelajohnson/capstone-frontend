// src/auth/AuthContext.jsx
// Handles login/signup/logout + keeps JWT in memory + sessionStorage
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { request } = useApi(); // custom fetch wrapper from ApiContext
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  // keep token synced to sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  //  helper to include Authorization header easily
  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // === register ===
  async function register(credentials) {
    const result = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
    setToken(result.token);
    return result;
  }

  // === login ===
  async function login(credentials) {
    const result = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
    setToken(result.token);
    return result;
  }

  // === logout ===
  function logout() {
    setToken(null);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ token, register, login, logout, authHeaders }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// simple custom hook
export function useAuth() {
  return useContext(AuthContext);
}
