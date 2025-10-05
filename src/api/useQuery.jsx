// this hook handles fetching data (GET requests) from the backend.
// it keeps track of loading, error, and data states — kinda like a mini react-query but simpler.
// I built it this way because it gives us full control and avoids extra dependencies.

import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export function useQuery(endpoint) {
  const { token } = useAuth(); // grab the auth token so we can call protected routes
  const [data, setData] = useState(null); // what we’ll show on the page
  const [loading, setLoading] = useState(true); // spinner or “loading…” state
  const [error, setError] = useState(null); // to catch any network or server errors

  // when the endpoint or token changes, we run a fetch
  // this way, if a user logs in or switches story, it reloads cleanly
  useEffect(() => {
    if (!endpoint) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // this pulls data from our backend, using the env var for flexibility
        const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // add token if logged in
          },
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const json = await res.json();
        setData(json); // success! save it to state
      } catch (err) {
        setError(err); // show the error message in the UI later
      } finally {
        setLoading(false); // stop spinner
      }
    }

    fetchData();
  }, [endpoint, token]);

  // quick helper so we can re-fetch whenever we need (like after creating a story)
  async function refetch() {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // we return everything so components can decide what to do with each piece
  return { data, loading, error, refetch };
}
