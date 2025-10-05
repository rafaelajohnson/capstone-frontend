// src/api/ApiContext.jsx
// Centralized place for API requests — avoids repeating fetch setup everywhere.

import { createContext, useContext } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  // Base request helper — automatically includes auth token if available
  const request = async (url, options = {}) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  };

  return (
    <ApiContext.Provider value={{ request }}>
      {children}
    </ApiContext.Provider>
  );
}

// 👇 Custom hook to access the API context anywhere in the app
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used inside an ApiProvider");
  }
  return context; // returns { request }
}
