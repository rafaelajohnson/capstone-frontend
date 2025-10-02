import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoriesList fetches all stories from the API
 * and shows them with links to their detail pages.
 */
export default function StoriesList() {
  const { data, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.length) return <p>No stories yet.</p>;

  return (
    <div>
      <h1>All Stories</h1>
      <ul>
        {data.map((story) => (
          <li key={story.id}>
            <Link to={`/stories/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/stories/new">+ Create a new story</Link>
    </div>
  );
}
