import useQuery from "../api/useQuery";
import { Link } from "react-router";

/**
 * StoriesList.jsx
 * Fetches all stories for the logged-in user.
 * Displays them in a list with links.
 * This is the "dashboard" for stories.
 */
export default function StoriesList() {
  // pull stories with GET /stories
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Your Stories</h1>

      {stories?.length > 0 ? (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              {/* Link each story to its detail page */}
              <Link to={`/stories/${story.id}`}>
                {story.title} ({story.topic})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stories yet. Try creating one!</p>
      )}
    </section>
  );
}
