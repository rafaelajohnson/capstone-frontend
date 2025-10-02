import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryList fetches all stories from the backend and shows them as links.
 * Each link goes to StoryDetail, so the user can read a single story.
 */
export default function StoryList() {
  // ask API for all stories, tag = "stories" (for cache invalidation)
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>All Stories</h1>
      <Link to="/stories/new">➕ Create New Story</Link>
      <ul>
        {stories?.map((story) => (
          <li key={story.id}>
            {/* clicking goes to StoryDetail */}
            <Link to={`/stories/${story.id}`}>
              {story.title} ({story.topic})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
