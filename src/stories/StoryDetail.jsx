import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryDetail fetches a single story by its id.
 * Links to its first page if available.
 */
export default function StoryDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Story not found.</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Topic: {data.topic}</p>
      <p>Created at: {new Date(data.created_at).toLocaleString()}</p>

      {/* Link to the first page of the story */}
      <Link to={`/pages/${data.id}`}>Go to first page</Link>
    </div>
  );
}
