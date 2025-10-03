// src/api/ApiContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth?.() || {}; // safely check token

  // Base URL for backend
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Central request function
  const request = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    // attach token if logged in
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(API + path, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("❌ API Error:", res.status, data);
      throw new Error(data.error || "Failed request");
    }

    return data;
  };

  return (
    <ApiContext.Provider value={{ request }}>
      {children}
    </ApiContext.Provider>
  );
}

// Hook
export function useApi() {
  return useContext(ApiContext);
}
