import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryList loads all stories from the backend
 * and shows them in a simple responsive grid.
 * 
 * I kept this minimal but responsive so it works on
 * phone, tablet, and desktop without needing a ton of CSS later.
 */
export default function StoryList() {
  // fetch all stories from /stories
  // I tagged this "stories" so other components (like NewStoryForm)
  // can trigger a refresh when they add a story
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  // basic loading and error states (so UI doesn't break silently)
  if (loading) return <p>Loading stories...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section className="story-list">
      <h1>Available Stories</h1>
      <div className="stories-grid">
        {stories?.map((story) => (
          <Link
            key={story.id}
            to={`/stories/${story.id}`}
            className="story-card"
          >
            <h2>{story.title}</h2>
            <p><strong>Topic:</strong> {story.topic}</p>
            <small>Created: {new Date(story.created_at).toLocaleDateString()}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
