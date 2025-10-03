// src/api/ApiContext.jsx
import { createContext, useContext } from "react";

const ApiContext = createContext();

export function ApiProvider({ children, token }) {
  const API = "http://localhost:3000"; // adjust if needed

  // Generic request wrapper
  const request = async (endpoint, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(API + endpoint, { ...options, headers });
    if (!res.ok) throw new Error(`Failed request: ${res.statusText}`);
    return res.json();
  };

  return (
    <ApiContext.Provider value={{ request, API }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
