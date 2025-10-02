// StoriesList.jsx
// This page fetches all stories from the backend and displays them.
// Each story title links to its detail page.

import { Link } from "react-router";
import useQuery from "../api/useQuery";

export default function StoriesList() {
  // useQuery automatically calls the API and keeps track of loading/errors
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!stories || stories.length === 0) return <p>No stories yet.</p>;

  return (
    <section>
      <h1>All Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/stories/${story.id}`}>
              <strong>{story.title}</strong>
            </Link>{" "}
            <em>({story.topic})</em>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "1.5rem" }}>
        <Link to="/stories/new">➕ Create a New Story</Link>
      </p>
    </section>
  );
}
