// lets user view a single story and delete it if they want to
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "../api/useQuery";
import { useMutation } from "../api/useMutation";

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // get the story details
  const { data: story, loading, error } = useQuery(`/stories/${id}`);

  // delete mutation hook
  const { mutate: deleteStory, loading: deleting } = useMutation(
    `/stories/${id}`,
    "DELETE"
  );

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this story?")) {
      await deleteStory();
      navigate("/stories");
    }
  }

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error loading story: {error.message}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{story.title}</h1>
      <p>
        <strong>Topic:</strong> {story.topic}
      </p>

      <button
        onClick={handleDelete}
        disabled={deleting}
        style={{ background: "#f44336", marginTop: "1rem" }}
      >
        {deleting ? "Deleting..." : "🗑️ Delete Story"}
      </button>
    </div>
  );
}
