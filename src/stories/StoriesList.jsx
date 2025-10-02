import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * Shows a list of stories that belong to the logged-in user.
 * Fetches stories from backend `/stories` endpoint.
 */
export default function StoriesList() {
  // hook automatically fetches data when component mounts
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error}</p>;
  if (!stories || stories.length === 0) return <p>No stories yet.</p>;

  return (
    <section>
      <h1>Your Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/stories/${story.id}`}>
              {story.title} ({story.topic})
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/stories/new">➕ Create New Story</Link>
    </section>
  );
}
