import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        // Fetch story info
        const storyRes = await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`);
        if (!storyRes.ok) throw new Error(`Story fetch failed: ${storyRes.status}`);
        const storyData = await storyRes.json();
        setStory(storyData);

        // Fetch pages linked to this story
        const pagesRes = await fetch(`${import.meta.env.VITE_API_URL}/pages?story_id=${id}`);
        if (!pagesRes.ok) throw new Error(`Pages fetch failed: ${pagesRes.status}`);
        const pagesData = await pagesRes.json();
        setPages(pagesData);
      } catch (err) {
        console.error("❌ Error fetching story detail:", err);
        setError(err.message);
      }
    }

    fetchStory();
  }, [id]);

  if (error) return <div className="floating-box">⚠️ {error}</div>;
  if (!story) return <div className="floating-box">Loading story...</div>;

  return (
    <div className="floating-box">
      <h2>{story.title}</h2>
      <p><strong>Topic:</strong> {story.topic}</p>
      <hr style={{ margin: "1rem 0", opacity: 0.3 }} />

      {pages.length === 0 ? (
        <p>No pages saved yet for this story.</p>
      ) : (
        <div className="story-pages">
          {pages.map((page, i) => (
            <div
              key={page.id || i}
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
            </div>
          ))}
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
            🏁 The End
          </p>
        </div>
      )}

      <Link to="/stories" className="button" style={{ marginTop: "1.5rem" }}>
        ← Back to My Stories
      </Link>
    </div>
  );
}
