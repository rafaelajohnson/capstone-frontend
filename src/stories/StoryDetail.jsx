import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryDetail shows the title + topic of a story and links to its first page.
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
      <p><em>{story.topic}</em></p>
      <Link to={`/pages/${story.firstPageId}`}>Start reading</Link>
    </section>
  );
}
