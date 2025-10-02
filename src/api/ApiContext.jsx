// src/api/ApiContext.jsx
import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// read API base URL from .env
export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();

  // build headers once per request, so token is always up to date
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // central request wrapper → every fetch goes through here
  const request = async (resource, options) => {
    const response = await fetch(API + resource, {
      headers,
      ...options,
    });

    // auto-parse JSON if server sends it
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      // throw a clean error message
      throw Error(result.error || result || "API request failed");
    }

    return result;
  };

  // tagging system → lets queries refresh when mutations run
  const [tags, setTags] = useState({});
  const provideTag = (tag, query) => {
    setTags((prev) => ({ ...prev, [tag]: query }));
  };
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => tags[tag]?.());
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

// helper hook so components can grab API tools
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within ApiProvider");
  return context;
}
