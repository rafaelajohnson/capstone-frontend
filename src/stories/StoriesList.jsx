import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryList fetches all stories from the backend and displays them.
 * Each story links to its detail page.
 */
export default function StoryList() {
  // Grab the data using our query hook
  const { data: stories, loading, error } = useQuery("/stories", "stories");

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!stories?.length) return <p>No stories found. Try creating one!</p>;

  return (
    <section>
      <h1>Stories</h1>
      <Link to="/stories/new">+ Create a new story</Link>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/stories/${story.id}`}>{story.title}</Link> –{" "}
            <em>{story.topic}</em>
          </li>
        ))}
      </ul>
    </section>
  );
}
