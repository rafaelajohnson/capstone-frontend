import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryDetail fetches one story by its ID.
 * We only show the title + topic here, and a link to its first page.
 */
export default function StoryDetail() {
  const { id } = useParams(); // get :id from the URL
  const { data: story, loading, error } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!story) return <p>No story found.</p>;

  return (
    <section>
      <h1>{story.title}</h1>
      <p>Topic: {story.topic}</p>
      <p>Created at: {new Date(story.created_at).toLocaleString()}</p>

      {/* link to the first page of this story */}
      <Link to={`/pages/${story.id}`}>Start reading</Link>
    </section>
  );
}
