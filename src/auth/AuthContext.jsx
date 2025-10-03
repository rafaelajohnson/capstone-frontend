// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../api/ApiContext"; // FIXED import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { request } = useApi(); // ✅ useApi hook gives us request()
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  // Keep token in sessionStorage so it survives refresh
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // --- Signup ---
  const register = async (credentials) => {
    const result = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setToken(result.token); // backend sends { user, token }
    return result;
  };

  // --- Login ---
  const login = async (credentials) => {
    const result = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setToken(result.token); // backend sends { user, token }
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
