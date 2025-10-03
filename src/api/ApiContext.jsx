// src/api/ApiContext.jsx
import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext";

// Base API URL from .env
export const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();

  // Reusable request helper
  const request = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    // ✅ Attach token if logged in
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("🔎 Sending request:", API + path, { ...options, headers }); // debug

    const response = await fetch(API + path, { ...options, headers });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);
      throw new Error(errorText || `Request failed with ${response.status}`);
    }

    return response.json();
  };

  return (
    <ApiContext.Provider value={{ request }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
