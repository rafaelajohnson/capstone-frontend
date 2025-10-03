/**
 * ApiContext
 * This file makes API calls consistent across the app.
 * It automatically attaches the user's token if they are logged in,
 * and it gives us a way to refresh queries after we do mutations.
 */

import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// The base URL of our backend comes from .env (VITE_API_URL)
export const API = import.meta.env.VITE_API_URL;

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const { token } = useAuth(); // pull current token from auth

  // Set up headers we want for *every* request
  const headers = { "Content-Type": "application/json" };
  if (token) {
    // If logged in, attach the Bearer token so backend sees we’re authorized
    headers["Authorization"] = `Bearer ${token}`;
  }

  // --- Main request function ---
  const request = async (resource, options = {}) => {
    try {
      const response = await fetch(API + resource, {
        headers,
        ...options, // allow caller to pass body/method/etc
      });

      // Decide how to parse the response
      const isJson = /json/.test(response.headers.get("Content-Type"));
      const result = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        // Pass along error from backend
        throw Error(result.error || result);
      }

      return result;
    } catch (err) {
      console.error("API request failed:", err);
      throw err; // let components know there was an error
    }
  };

  // --- Simple "tag system" so we can refresh data after a mutation ---
  const [tags, setTags] = useState({});
  const provideTag = (tag, query) => {
    // basically register this query function under a tag name
    setTags((prev) => ({ ...prev, [tag]: query }));
  };
  const invalidateTags = (tagsToInvalidate) => {
    // re-run queries that were registered under these tags
    tagsToInvalidate.forEach((tag) => {
      if (tags[tag]) tags[tag]();
    });
  };

  // Expose everything to the rest of the app
  const value = { request, provideTag, invalidateTags };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

// Custom hook so components can use API stuff
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw Error("useApi must be used within an ApiProvider");
  return context;
}
