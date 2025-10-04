// src/stories/StoriesList.jsx
// Shows all stories for the logged-in user — kind of like their "story dashboard".

import { useEffect } from "react";
import { useQuery } from "../api/useQuery"; // tiny wrapper around fetch()
import { Link } from "react-router-dom";

export default function StoriesList() {
  // grabbing the stories from our backend (it auto-handles token + JSON)
  const { data: stories, loading, error, refetch } = useQuery("/stories");

  // refetch right after mount — just to make sure we’re not seeing cached data
  useEffect(() => {
    refetch();
  }, []);

  // basic loading + error states, nothing fancy
  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error.message}</p>;

  return (
    <div className="stories-list">
      <h1>Your Stories</h1>

      {/* when the user hasn’t made any stories yet */}
      {(!stories || stories.length === 0) && <p>No stories yet!</p>}

      {/* loop through and show each story in a little card-style block */}
      {stories?.map((story) => (
        <div key={story.id} className="story-card">
          <h2>{story.title}</h2>
          <p>
            <strong>Topic:</strong> {story.topic}
          </p>

          {/* router link instead of <a> so we don’t reload the whole app */}
          <Link to={`/stories/${story.id}`}>View</Link>
        </div>
      ))}

      {/* add new story button at the bottom */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/stories/new" className="new-btn">
          + Create New Story
        </Link>
      </div>
    </div>
  );
}
