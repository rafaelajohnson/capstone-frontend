import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryList fetches all stories from the backend
 * and displays them in a simple list with links.
 * I’m using useQuery so it auto-refreshes if stories change.
 */
export default function StoryList() {
  // hook to fetch all stories, "stories" tag lets us re-fetch after mutations
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error loading stories: {error}</p>;
  if (!stories?.length) return <p>No stories yet. Why not create one?</p>;

  return (
    <div>
      <h1>All Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            {/* Clicking takes me to /stories/:id */}
            <Link to={`/stories/${story.id}`}>
              {story.title} ({story.topic})
            </Link>
          </li>
        ))}
      </ul>

      {/* Shortcut to create a new story */}
      <Link to="/stories/new">
        <button>Create a New Story</button>
      </Link>
    </div>
  );
}
