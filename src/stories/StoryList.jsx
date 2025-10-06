// src/stories/StoriesList.jsx
// This shows all stories for whoever’s logged in.
// Basically the main "dashboard" for stories.

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function StoryList() {
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/stories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchStories();
  }, [token]);

  async function handleDelete(id) {
    if (!confirm("Delete this story?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setStories(stories.filter((s) => s.id !== id));
    } catch {
      alert("❌ Failed to delete story.");
    }
  }

  if (error)
    return <div className="floating-box">⚠️ Error loading stories: {error}</div>;

  return (
    <div className="floating-box">
      <h2>Your Stories</h2>
      {stories.length === 0 ? (
        <p>No stories yet — <Link to="/new">create one!</Link></p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {stories.map((story) => (
            <li
              key={story.id}
              style={{
                marginBottom: "1rem",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <h3 style={{ marginBottom: "0.2rem" }}>{story.title}</h3>
              <p><strong>Topic:</strong> {story.topic}</p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <Link className="button" to={`/stories/${story.id}`}>
                  View
                </Link>
                <button
                  onClick={() => handleDelete(story.id)}
                  style={{
                    background: "#ff5c5c",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.4rem 1rem",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/new" className="button">✨ Create New Story</Link>
    </div>
  );
}
