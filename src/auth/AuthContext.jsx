// handles login/signup/logout logic and keeps the token in memory + sessionStorage
import { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../api/ApiContext"; // gives us request()

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { request } = useApi(); // make sure this matches the ApiContext
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  // keep token synced with sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // register a new user
  async function register(credentials) {
    const result = await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setToken(result.token);
    return result;
  }

  // login an existing user
  async function login(credentials) {
    const result = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setToken(result.token);
    return result;
  }

  // logout clears token everywhere
  function logout() {
    setToken(null);
    sessionStorage.removeItem("token");
  }

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// hook so other files can use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used inside an AuthProvider");
  return context;
}
