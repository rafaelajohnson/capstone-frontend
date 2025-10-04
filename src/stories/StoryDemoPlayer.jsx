// src/stories/StoryDemoPlayer.jsx
// This one pretends to “play” an AI-generated story using our mock data.
// Each click changes the story path based on what the user picks.

import { useState } from "react";
import { Link } from "react-router-dom";
import { mockStory } from "../data/mockStories";

export default function StoryDemoPlayer() {
  // we start from the "start" page of our mock story
  const [currentPageKey, setCurrentPageKey] = useState("start");
  const currentPage = mockStory.pages[currentPageKey];

  // simple click handler for when a user picks an option
  const handleOptionClick = (nextKey) => {
    setCurrentPageKey(nextKey);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>{mockStory.title}</h1>

      {/* story image if there is one */}
      {currentPage.image && (
        <img
          src={currentPage.image}
          alt="Story scene"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        />
      )}

      {/* the main text of the story */}
      <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
        {currentPage.text}
      </p>

      {/* options show up as buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {currentPage.options.length > 0 ? (
          currentPage.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt.next)}
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: "#007b7f",
                color: "white",
                fontSize: "1rem",
              }}
            >
              {opt.text}
            </button>
          ))
        ) : (
          // when there are no options left, it means the story’s over
          <p style={{ fontStyle: "italic" }}>
            The story ends here. Want to start again?
          </p>
        )}
      </div>

      {/* link to restart or head back to demo menu */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/demo" style={{ color: "#007b7f", textDecoration: "none" }}>
          ← Back to demo menu
        </Link>
        {currentPage.options.length === 0 && (
          <button
            onClick={() => setCurrentPageKey("start")}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #007b7f",
              background: "white",
              cursor: "pointer",
            }}
          >
            Restart Story
          </button>
        )}
      </div>
    </div>
  );
}
