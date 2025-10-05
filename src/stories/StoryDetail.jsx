import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [story, setStory] = useState(null);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // === FETCH STORY & PAGES ===
  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error(`Story fetch failed: ${res.status}`);
        const storyData = await res.json();
        setStory(storyData);

        const pagesRes = await fetch(
          `${import.meta.env.VITE_API_URL}/pages?story_id=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );
        if (!pagesRes.ok) throw new Error(`Pages fetch failed: ${pagesRes.status}`);
        const pagesData = await pagesRes.json();
        setPages(pagesData);
      } catch (err) {
        console.error("❌ Error fetching story detail:", err);
        setError(err.message);
      }
    }

    fetchStory();
  }, [id, token]);

  // === DELETE STORY HANDLER ===
  async function handleDelete() {
    if (!confirm("🗑️ Are you sure you want to delete this story?")) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      alert("✅ Story deleted successfully.");
      navigate("/stories");
    } catch (err) {
      console.error("❌ Error deleting story:", err);
      alert("Failed to delete story. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  // === RENDER ===
  if (error) return <div className="floating-box">⚠️ {error}</div>;
  if (!story) return <div className="floating-box">Loading story...</div>;

  return (
    <div className="floating-box">
      <h2>{story.title}</h2>
      <p>
        <strong>Topic:</strong> {story.topic}
      </p>
      <hr style={{ margin: "1rem 0", opacity: 0.3 }} />

      {pages.length === 0 ? (
        <p>No pages saved yet for this story.</p>
      ) : (
        <div className="story-pages">
          {pages.map((page, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              <h4 style={{ color: "#9cd3ff" }}>Scene {i + 1}</h4>
              <p>{page.text}</p>
              {page.options?.length > 0 && (
                <ul style={{ marginLeft: "1rem" }}>
                  {page.options.map((opt, j) => (
                    <li key={j}>➡️ {opt.text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
            🏁 The End
          </p>
        </div>
      )}

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/stories" className="button">
          ← Back to My Stories
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            background: isDeleting ? "#999" : "#ff4d4d",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            borderRadius: "10px",
            border: "none",
            cursor: isDeleting ? "not-allowed" : "pointer",
            boxShadow: "0 0 10px rgba(255,0,0,0.4)",
          }}
        >
          {isDeleting ? "Deleting..." : "🗑️ Delete Story"}
        </button>
      </div>
    </div>
  );
}
