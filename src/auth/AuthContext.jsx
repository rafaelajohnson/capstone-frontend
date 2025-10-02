import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext"; // base URL comes from .env

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // keep track of token, initialize from sessionStorage if available
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // persist token in sessionStorage whenever it changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // register a new user (calls backend /auth/signup)
  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Failed to register");

    // store JWT from backend response
    setToken(result.token);
  };

  // login an existing user (calls backend /auth/login)
  const login = async (credentials) => {
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Failed to login");

    setToken(result.token);
  };

  // clear token on logout
  const logout = () => {
    setToken(null);
  };

  // expose token + methods to rest of app
  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
