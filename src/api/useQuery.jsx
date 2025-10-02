// src/api/useQuery.jsx
import { useState, useEffect } from "react";
import { useApi } from "./ApiContext";

/**
 * Custom hook for GET requests.
 * Makes the call once when the component loads.
 * Re-runs if a mutation invalidates its tag.
 * Returns data, loading, and error so the UI can handle all cases.
 */
export default function useQuery(resource, tag) {
  const { request, provideTag } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // the actual fetch logic
  const query = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await request(resource);
      setData(result); // store data for UI
    } catch (e) {
      console.error("Query failed:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // register this query with a tag so mutations can refresh it
    if (tag) provideTag(tag, query);
    query(); // run immediately on mount
  }, []);

  return { data, loading, error, refetch: query };
}
