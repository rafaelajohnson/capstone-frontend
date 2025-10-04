// StoryDemo.jsx
// This page just shows 3 "mock AI" stories so users can pick one to explore.
// Once clicked, it sends to StoryViewer with the matching story id.

import { Link } from "react-router-dom";

export default function StoryDemo() {
  // quick list of fake stories (we're keeping it simple for demo mode)
  const demoStories = [
    { id: "dog", title: "The Brave Dog", summary: "A loyal dog sets out on a new adventure." },
    { id: "space", title: "Journey to Space", summary: "Blast off into the stars and discover new worlds." },
    { id: "castle", title: "Mystery of the Castle", summary: "Explore a foggy castle full of secrets." },
  ];

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Choose a Story to Begin</h2>
      <p style={{ marginBottom: "1rem" }}>
        These are prebuilt “mock AI” stories just to show how the real thing would work later.
      </p>

      {/* a simple flex layout for the cards */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {demoStories.map((story) => (
          <div
            key={story.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "1rem",
              width: "250px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {/* Each story is a Link that takes you to StoryViewer */}
            <h3>{story.title}</h3>
            <p>{story.summary}</p>
            <Link to={`/demo/${story.id}`} style={{ color: "teal", fontWeight: "bold" }}>
              Start →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
