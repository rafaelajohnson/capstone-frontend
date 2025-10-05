// this hook is for POST, PUT, DELETE — basically any request that changes data.
// it’s kinda like the sister to useQuery.jsx but for “doing” things instead of “getting” things.
// we kept it custom-built so we can control how the loading + error handling feels.

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function useMutation(endpoint, method = "POST") {
  const { token } = useAuth(); // get token from AuthContext — needed for protected routes
  const [loading, setLoading] = useState(false); // true when sending a request
  const [error, setError] = useState(null); // store errors from failed requests
  const [data, setData] = useState(null); // response data after a successful request

  // this function actually runs the request
  // we named it “mutate” because it sounds like “change something”
  async function mutate(bodyData) {
    try {
      setLoading(true);
      setError(null);

      // build the request with dynamic endpoint + method
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const json = await res.json();
      setData(json); // save the response (like success message or new object)
      return json;
    } catch (err) {
      setError(err); // if something fails, we can show it in the UI
    } finally {
      setLoading(false); // always stop the spinner
    }
  }

  // we return mutate so the component can call it when needed
  // also expose data + loading + error for easy UI updates
  return { mutate, data, loading, error };
}
