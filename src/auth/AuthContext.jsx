import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "null")
  );

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [token, user]);

  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Signup failed");

    setToken(result.token);
    setUser(result.user);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Login failed");

    setToken(result.token);
    setUser(result.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  const value = { token, user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

