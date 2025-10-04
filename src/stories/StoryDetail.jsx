// src/stories/StoryDetail.jsx
// This shows one story, its pages, and lets me delete it if needed.

import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "../api/useQuery";
import { useMutation } from "../api/useMutation";

export default function StoryDetail() {
  const { id } = useParams(); // grabbing story id from URL
  const navigate = useNavigate();

  // fetching the actual story from backend
  const { data: story, loading, error, refetch } = useQuery(`/stories/${id}`);

  // setting up delete action — will call DELETE /stories/:id
  const { mutate: deleteStory, loading: deleting } = useMutation(
    `/stories/${id}`,
    {
      method: "DELETE",
      onSuccess: () => {
        alert("Story deleted successfully");
        navigate("/stories");
      },
      onError: (err) => {
        console.error("Error deleting:", err);
        alert("Could not delete story");
      },
    }
  );

  // showing normal loading/error states first
  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error loading story: {error.message}</p>;
  if (!story) return <p>Story not found</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{story.title}</h1>
      <p><strong>Topic:</strong> {story.topic}</p>

      {/* I like adding a small note just to make it friendlier */}
      <p style={{ fontStyle: "italic" }}>
        This story has {story.pages?.length || 0} page(s).
      </p>

      {/* show all the pages of this story */}
      {story.pages && story.pages.length > 0 ? (
        <ul>
          {story.pages.map((p) => (
            <li key={p.id}>
              <Link to={`/pages/${p.id}`}>Page {p.page_number}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages yet. You can add some soon!</p>
      )}

      {/* Delete story button (final CRUD piece) */}
      <button
        style={{
          background: "crimson",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "6px",
          marginTop: "1rem",
          cursor: "pointer",
        }}
        disabled={deleting}
        onClick={() => {
          if (confirm("Are you sure you want to delete this story?")) {
            deleteStory();
          }
        }}
      >
        {deleting ? "Deleting..." : "Delete Story"}
      </button>

      {/* navigation link back */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/stories">← Back to Stories</Link>
      </div>
    </div>
  );
}
