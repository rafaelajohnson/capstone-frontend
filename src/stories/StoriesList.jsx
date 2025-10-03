// src/stories/StoriesList.jsx
import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function StoriesList() {
  const { token } = useAuth();

  // If user is not logged in, don't even try to fetch → avoid 401 spam
  if (!token) {
    return <p>You must log in to view available stories.</p>;
  }

  // Only runs if user has a token
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section>
      <h1>Stories</h1>
      {stories && stories.length > 0 ? (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              {/* Clicking story title takes you to story detail page */}
              <Link to={`/stories/${story.id}`}>{story.title}</Link> -{" "}
              <em>{story.topic}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stories available yet.</p>
      )}

      {/* Shortcut link to create new story */}
      <p>
        <Link to="/stories/new">Create a new story</Link>
      </p>
    </section>
  );
}
