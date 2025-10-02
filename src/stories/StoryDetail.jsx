import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import { Link } from "react-router";

/**
 * StoryDetail.jsx
 * Shows a single story and its details.
 * Pulls story id from URL.
 */
export default function StoryDetail() {
  const { id } = useParams();

  const { data: story, loading, error } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <section>
      <h1>{story.title}</h1>
      <p><strong>Topic:</strong> {story.topic}</p>
      <p><strong>Created At:</strong> {new Date(story.created_at).toLocaleString()}</p>

      <Link to={`/stories/${id}/new-page`}>➕ Add Page</Link>
    </section>
  );
}
