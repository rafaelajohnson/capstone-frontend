// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

// this is the global context object we’ll use to share auth state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // I’m storing the token in state so React can re-render when it changes
  // but I also pull it from sessionStorage so it persists after refresh
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // whenever token changes, save it into sessionStorage
  // (this way if the user refreshes, they’re still logged in)
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    }
  }, [token]);

  // register a new user
  // hitting the backend’s /auth/signup endpoint
  // backend returns { user, token } so I grab the token and set it
  const register = async (credentials) => {
    const response = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw Error(result.error || "Failed to register");
    setToken(result.token); // save token in state (and sessionStorage via effect)
  };

  // login is basically the same thing but points at /auth/login
  // backend gives me a token and I stash it for future requests
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

  // logout just clears the token from both React state + sessionStorage
  // I don’t need to call the backend for logout because JWTs are stateless
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  // value passed into the provider so all components can use these helpers
  const value = { token, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// helper hook so I don’t have to manually call useContext(AuthContext) everywhere
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
