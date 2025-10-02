// auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

import { API } from "../api/ApiContext"; // this grabs the backend URL from .env

// This context will let the whole app know if a user is logged in or not
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // I’m keeping the token in state, and also saving it to sessionStorage
  // so that if I refresh the page, I’m still logged in.
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // whenever token changes, update sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // -----------------------------
  // REGISTER
  // -----------------------------
  const register = async (credentials) => {
    // call the backend /auth/signup route
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // backend sends { user, token }
    const result = await response.json();

    if (!response.ok) {
      // if the backend sends an error, throw it
      throw Error(result.error || "Signup failed");
    }

    // save the token into state + sessionStorage
    setToken(result.token);
  };

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (credentials) => {
    // call the backend /auth/login route
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      throw Error(result.error || "Login failed");
    }

    setToken(result.token);
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    setToken(null); // clear state
    sessionStorage.removeItem("token"); // clear saved token
  };

  // everything we need to use in components
  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This is just the hook I’ll use in my components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
