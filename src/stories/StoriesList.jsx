// src/stories/StoriesList.jsx
// This shows all stories for whoever’s logged in.
// Basically the main "dashboard" for stories.

import { useEffect } from "react";
import { useQuery } from "../api/useQuery"; // our custom fetch hook
import { Link } from "react-router-dom";

export default function StoriesList() {
  // useQuery does the GET request and gives me loading + error states too
  const { data: stories, loading, error, refetch } = useQuery("/stories");

  // when the page loads, I refetch just to make sure it’s fresh data
  useEffect(() => {
    refetch();
  }, []);

  // quick checks for loading and errors before showing stuff
  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

  return (
    <div className="stories-list">
      <h1>Your Stories</h1>

      {/* if the user has no stories yet, just say so nicely */}
      {(!stories || stories.length === 0) && <p>No stories yet!</p>}

      {/* loop through and show each story as a small card */}
      {stories?.map((story) => (
        <div key={story.id} className="story-card">
          <h2>{story.title}</h2>
          <p><strong>Topic:</strong> {story.topic}</p>

          {/* using Link instead of <a> so React Router doesn’t reload the page */}
          <Link to={`/stories/${story.id}`}>View</Link>
        </div>
      ))}

      {/* button at the bottom to make a new story */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/stories/new" className="new-btn">
          Create New Story
        </Link>
      </div>
    </div>
  );
}
