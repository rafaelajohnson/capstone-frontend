// src/stories/StoryDetail.jsx
import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function StoryDetail() {
  const { id } = useParams();
  const { token } = useAuth();

  // 🚪 If user isn't logged in, don't even bother fetching
  if (!token) {
    return <p>You must log in to view this story.</p>;
  }

  // ✅ Fetch a single story by ID (backend gives us title + topic + created_at)
  const {
    data: story,
    loading,
    error,
  } = useQuery(`/stories/${id}`, `story-${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <section>
      <h1>{story.title}</h1>
      <p>
        <em>Topic: {story.topic}</em>
      </p>
      <p>
        <Link to={`/pages/${story.id}`}>Start reading this story →</Link>
      </p>
    </section>
  );
}
