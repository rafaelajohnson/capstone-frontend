import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryDetail shows info for a single story.
 * It grabs the `id` from the URL, fetches that story,
 * and shows basic details with a link to its pages.
 */
export default function StoryDetail() {
  const { id } = useParams(); // story id from URL
  const { data: story, loading, error } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p><strong>Topic:</strong> {story.topic}</p>
      <p><strong>Created:</strong> {new Date(story.created_at).toLocaleString()}</p>

      {/* Link to the first page of this story */}
      <Link to={`/pages/${story.id}`}>Start reading</Link>

      <br />
      <Link to="/stories">← Back to all stories</Link>
    </div>
  );
}
