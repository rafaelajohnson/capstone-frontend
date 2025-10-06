import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockStories } from "../data/mockStories";

export default function StoryDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [story, setStory] = useState(null);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mockMode, setMockMode] = useState(false);

  // Try to read topic from query string or remember the last one
  const searchParams = new URLSearchParams(location.search);
  const topicFromQuery = searchParams.get("topic");

  useEffect(() => {
    async function fetchStory() {
      try {
        const storyRes = await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`);
        if (!storyRes.ok) throw new Error(`Story fetch failed: ${storyRes.status}`);
        const storyData = await storyRes.json();
        setStory(storyData);

        const pagesRes = await fetch(`${import.meta.env.VITE_API_URL}/pages?story_id=${id}`);
        if (!pagesRes.ok) throw new Error(`Pages fetch failed: ${pagesRes.status}`);
        const pagesData = await pagesRes.json();
        setPages(pagesData);
      } catch (err) {
        console.warn("⚠️ Falling back to mock story:", err.message);
        setMockMode(true);

        // --- Determine topic correctly ---
        let topicKey =
          topicFromQuery?.toLowerCase() ||
          story?.topic?.toLowerCase() ||
          localStorage.getItem("lastTopic") ||
          "dog";

        // Normalize invalid topics
        if (!["dog", "space", "castle"].includes(topicKey)) topicKey = "dog";
        localStorage.setItem("lastTopic", topicKey);

        // Pick correct mock story
        const mock = mockStories[topicKey] || mockStories.dog;
        setStory({ title: mock.title, topic: topicKey });
        setPages(mock.pages);
      }
    }

    fetchStory();
  }, [id]);

  // Handles button click and page switching
  const handleOptionClick = (nextId) => {
    if (nextId === "end" || nextId === undefined) {
      setCurrentPage("end");
      return;
    }

    const nextIndex = pages.findIndex((p) => p.id === nextId);
    if (nextIndex !== -1) {
      setCurrentPage(nextIndex);
    } else {
      const next = currentPage + 1;
      setCurrentPage(pages[next] ? next : "end");
    }
  };

  if (error) return <div className="floating-box">⚠️ {error}</div>;
  if (!story) return <div className="floating-box">Loading story...</div>;

  // --- MOCK MODE (AI fallback) ---
  if (mockMode) {
    const current = currentPage === "end" ? null : pages[currentPage];

    return (
      <div className="floating-box">
        <h2>{story.title}</h2>
        <p>
          <strong>Topic:</strong> {story.topic}
        </p>
        <hr style={{ margin: "1rem 0", opacity: 0.3 }} />

        {currentPage === "end" ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p>🏁 The adventure ends for now. But tomorrow is another day!</p>
            <Link to="/stories" className="button" style={{ marginTop: "1.5rem" }}>
              ← Back to My Stories
            </Link>
          </div>
        ) : (
          <>
            <h4>Scene {currentPage + 1}</h4>
            <p>{current.text}</p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt.next)}
                  className="button"
                  style={{
                    background: "linear-gradient(90deg, #1e90ff, #00bfff)",
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  👉 {opt.text}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // --- REAL DATABASE MODE ---
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
        pages.map((p, i) => (
          <div key={p.id || i} style={{ marginBottom: "1rem" }}>
            <h4>Scene {i + 1}</h4>
            <p>{p.text}</p>
          </div>
        ))
      )}

      <Link to="/stories" className="button" style={{ marginTop: "1.5rem" }}>
        ← Back to My Stories
      </Link>
    </div>
  );
}
