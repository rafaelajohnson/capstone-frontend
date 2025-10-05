// src/stories/StoriesList.jsx
// This shows all stories for whoever’s logged in.
// Basically the main "dashboard" for stories.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "../api/useQuery"; // custom GET hook

export default function StoriesList() {
  // fetch all stories from the backend
  const { data: stories, loading, error, refetch } = useQuery("/stories");

  // refresh stories once when page loads
  useEffect(() => {
    refetch();
  }, []);

  // loading and error handling
  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

  return (
    <div className="floating-box">
      <h1>Your Stories</h1>

      {/* message if user has none yet */}
      {(!stories || stories.length === 0) && <p>No stories yet!</p>}

      {/* story cards */}
      {stories?.map((story) => (
        <div
          key={story.id}
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "1rem",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        >
          <h2>{story.title}</h2>
          <p>
            <strong>Topic:</strong> {story.topic}
          </p>
          <Link
            to={`/stories/${story.id}`}
            className="button"
            style={{ marginTop: "0.5rem" }}
          >
            View
          </Link>
        </div>
      ))}

      {/* new story button */}
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/stories/new" className="button">
          Create New Story
        </Link>
      </div>
    </div>
  );
}