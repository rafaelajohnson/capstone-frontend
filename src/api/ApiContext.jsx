// src/api/ApiContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

// Create a context for API requests
const ApiContext = createContext();

/**
 * ApiProvider wraps the app and provides a request() function
 * that automatically includes the Authorization header if a token exists.
 */
export function ApiProvider({ children }) {
  const { token } = useAuth();

  // Centralized request function
  async function request(endpoint, options = {}) {
    const url = `http://localhost:3000${endpoint}`;

    // Ensure headers exist
    const headers = options.headers ? { ...options.headers } : {};

    // If token exists, attach Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Always expect JSON in/out
    headers["Content-Type"] = "application/json";

    console.log("🔎 Sending request:", url, { headers });

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      console.error("❌ API Error:", res.status, res.statusText);
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  return (
    <ApiContext.Provider value={{ request }}>{children}</ApiContext.Provider>
  );
}

/**
 * Hook to use API functions
 */
export function useApi() {
  return useContext(ApiContext);
}
