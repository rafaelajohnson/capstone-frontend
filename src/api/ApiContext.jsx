// src/api/ApiContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth(); // ✅ get token from AuthContext

  const API_BASE = "http://localhost:3000"; // backend base URL

  // Unified request helper
  async function request(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // attach token if logged in
      ...options.headers,
    };

    const res = await fetch(API_BASE + endpoint, { ...options, headers });

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
