// src/api/ApiContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();

  const API = "http://localhost:3000";

  async function request(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(API + endpoint, { ...options, headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed request: ${res.status}`);
    }
    return res.json();
  }

  const value = { request };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return useContext(ApiContext);
}
