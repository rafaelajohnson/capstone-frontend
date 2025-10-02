// src/api/useMutation.jsx
import { useState } from "react";
import { useApi } from "./ApiContext";

/**
 * Custom hook for POST/PUT/DELETE requests.
 * Handles loading + error states for buttons/forms.
 * Automatically refreshes any queries tied to tags.
 * Returns a mutate function the component can call.
 */
export default function useMutation(method, resource, tagsToInvalidate = []) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // this is the "action" the UI calls
  const mutate = async (body) => {
    setLoading(true);
    setError(null);

    try {
      const result = await request(resource, {
        method,
        body: JSON.stringify(body),
      });
      setData(result);

      // refresh anything watching these tags
      invalidateTags(tagsToInvalidate);

      return true; // let caller know success
    } catch (e) {
      console.error("Mutation failed:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }

    return false;
  };

  return { mutate, data, loading, error };
}
