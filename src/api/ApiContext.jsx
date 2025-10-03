import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// base API URL comes from .env
export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth();

  // every API request will build headers fresh, so token is always included
  const request = async (resource, options = {}) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(API + resource, {
      ...options,
      headers,
    });

    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : await response.text();
    if (!response.ok) throw Error(result.error || "Failed request");
    return result;
  };

  // tag system is just to refresh queries when mutations happen
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

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within a ApiProvider");
  return context;
}
