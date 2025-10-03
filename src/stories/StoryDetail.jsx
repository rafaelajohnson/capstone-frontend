// src/stories/StoryDetail.jsx
import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * StoryDetail
 * Shows details of a single story by ID, including title and topic.
 */
export default function StoryDetail() {
  const { id } = useParams();

  // GET /stories/:id
  const { data: story, loading, error } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h1>{story.title}</h1>
      <p><strong>Topic:</strong> {story.topic}</p>

      {/* Link to first page */}
      <Link to={`/pages/${story.firstPageId}`}>
        <button>Start Reading</button>
      </Link>
    </section>
  );
}
