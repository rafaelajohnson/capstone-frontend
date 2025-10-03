// src/api/useQuery.jsx
import { useEffect, useState } from "react";
import { useApi } from "./ApiContext";
import { useAuth } from "../auth/AuthContext";

/**
 * useQuery
 * Small helper hook to fetch data with loading/error states.
 * @param {string} path - API path (e.g. "/stories")
 * @param {string} key - cache key (unused for now, could help with invalidation later)
 */
export default function useQuery(path, key) {
  const { request } = useApi();
  const { token } = useAuth(); // ✅ grab token for debugging
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        console.log("🔑 useQuery token:", token); // log token
        console.log("🌍 useQuery fetching:", path);

        const result = await request(path);
        if (!ignore) {
          setData(result);
        }
      } catch (err) {
        console.error("❌ Query failed:", err);
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [path, key, request, token]);

  return { data, loading, error };
}
