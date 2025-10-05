// src/api/useMutation.jsx
// This hook is for sending POST/PUT/DELETE requests — basically anything that *changes* data.
// It’s the action twin of useQuery.jsx (which just *gets* data).
// Keeping it hand-coded means we can control exactly how loading and errors behave.

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function useMutation(endpoint, method = "POST") {
  const { token } = useAuth(); // grab our auth token for protected routes
  const [loading, setLoading] = useState(false); // track when we're sending data
  const [error, setError] = useState(null); // catch any network/server issues
  const [data, setData] = useState(null); // hold the response data (like a created object)

  // this is the function we actually call to send data
  async function mutate(bodyData) {
    try {
      setLoading(true);
      setError(null);

      // make sure the API URL exists and build the full request path
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const url = `${baseUrl}${endpoint}`; // example → http://localhost:3000/stories

      // send the request
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), // attach token if we have one
        },
        body: JSON.stringify(bodyData),
      });

      // handle non-200s
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with ${res.status}`);
      }

      // if it worked — parse JSON + store it
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      console.error("❌ useMutation error:", err);
      setError(err);
    } finally {
      setLoading(false); // stop the spinner
    }
  }

  // return everything so components can use it however they want
  return { mutate, data, loading, error };
}
