// src/stories/StoryDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockStories } from "../data/mockStories";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const storyRes = await fetch(`${import.meta.env.VITE_API_URL}/stories/${id}`, { headers });
        if (!storyRes.ok) throw new Error(`Story fetch failed: ${storyRes.status}`);
        const storyData = await storyRes.json();
        setStory(storyData);

        const pagesRes = await fetch(`${import.meta.env.VITE_API_URL}/pages/story/${id}`, { headers });
        if (!pagesRes.ok) throw new Error(`Pages fetch failed: ${pagesRes.status}`);
        const pagesData = await pagesRes.json();
        setPages(pagesData);
      } catch (err) {
        console.warn("⚠️ Falling back to mock story:", err.message);

        const topic = id.includes("castle")
          ? "castle"
          : id.includes("space")
          ? "space"
          : "dog";

        const mock = mockStories[topic];
        if (mock) {
          setStory({ title: mock.title, topic });
          setPages([mock.pages[0]]);
        } else {
          setError(err.message);
        }
      }
    }

    fetchStory();
  }, [id]);

  // Handle next page based on mock branching
  function handleChoice(nextIndex) {
    const topic = story?.topic || "dog";
    const mock = mockStories[topic];
    if (!mock) return;

    if (nextIndex === "end") {
      alert("🎉 The story has ended! Returning to My Stories.");
      window.location.href = "/stories";
      return;
    }

    const nextPage = mock.pages[nextIndex];
    if (nextPage) {
      setPages((prev) => [...prev, nextPage]);
      setCurrentPage(nextIndex);
    }
  }

  if (error) return <div className="floating-box">⚠️ {error}</div>;
  if (!story) return <div className="floating-box">Loading story...</div>;

  const current = pages[currentPage];

  return (
    <div className="floating-box">
      <h2>{story.title}</h2>
      <p>
        <strong>Topic:</strong> {story.topic}
      </p>
      <hr style={{ margin: "1rem 0", opacity: 0.3 }} />

      {current ? (
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#9cd3ff" }}>Scene {currentPage + 1}</h4>
          <p>{current.text}</p>

          {current.options && current.options.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt.next)}
                  style={{
                    display: "block",
                    width: "100%",
                    margin: "0.5rem 0",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    background: "#0ea5e9",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  👉 {opt.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>No story pages found.</p>
      )}

      <Link to="/stories" className="button" style={{ marginTop: "2rem", display: "inline-block" }}>
        ← Back to My Stories
      </Link>
    </div>
  );
}
