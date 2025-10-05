// src/stories/StoryAI.jsx
import { useState, useEffect } from "react";
import { mockStories } from "../data/mockStories";
import { useMutation } from "../api/useMutation";
import { Link } from "react-router-dom";

export default function StoryAI() {
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState("start");
  const [story, setStory] = useState(null);
  const { mutate: savePage } = useMutation("/pages", "POST");

  useEffect(() => {
    const savedTopic = (localStorage.getItem("aiTopic") || "").toLowerCase();
    setTopic(savedTopic);

    // pick the right template (default to dog)
    let selected =
      mockStories[savedTopic.includes("space")
        ? "space"
        : savedTopic.includes("castle")
        ? "castle"
        : "dog"];
    setStory(selected);
  }, []);

  async function handleChoice(nextKey, currentText) {
    // save current page to backend
    try {
      await savePage({
        story_id: 1, // you could fetch real story id if needed
        text: currentText,
      });
    } catch (err) {
      console.warn("Could not save page:", err);
    }

    // move forward
    setCurrentPage(nextKey);
  }

  if (!story) return <p>Loading your adventure...</p>;
  const page = story.pages[currentPage];

  return (
    <div className="floating-box">
      <h2>{story.title}</h2>
      {page.image && (
        <img
          src={page.image}
          alt="scene"
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "1rem",
            maxHeight: "300px",
            objectFit: "cover",
          }}
        />
      )}
      <p style={{ marginBottom: "1.5rem" }}>{page.text}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {page.options.length > 0 ? (
          page.options.map((opt, i) => (
            <button
              key={i}
              className="button"
              onClick={() => handleChoice(opt.next, page.text)}
            >
              {opt.text}
            </button>
          ))
        ) : (
          <>
            <p>🏁 The End — Thanks for playing!</p>
            <Link to="/stories" className="button">
              📖 View Saved Stories
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
