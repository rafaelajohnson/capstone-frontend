// src/stories/StoriesList.jsx
import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoriesList
 * Shows all stories for the logged-in user.
 * Uses useQuery to hit GET /stories (backend requires token).
 * Provides links to view a story or create a new one.
 */
export default function StoriesList() {
  // Call API to fetch stories, tag = "stories" so it refreshes if invalidated
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Your Stories</h1>

      {/* Link to create a brand new story */}
      <Link to="/stories/new">
        <button>Create New Story</button>
      </Link>

      {/* If no stories yet, tell the user */}
      {(!stories || stories.length === 0) && <p>No stories yet.</p>}

      <ul>
        {stories?.map((story) => (
          <li key={story.id}>
            {/* Each story links to its detail page */}
            <Link to={`/stories/${story.id}`}>
              {story.title} ({story.topic})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
