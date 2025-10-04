// src/stories/StoryDemo.jsx
// This page is basically a “demo hub.”
// Lets the user preview a few fake AI-generated stories or launch the mock interactive one.

import { Link } from "react-router-dom";

export default function StoryDemo() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Try a Demo Story</h1>
      <p>
        Pick one of these sample story ideas — or go wild with the interactive
        demo version.
      </p>

      {/* the 3 small prebuilt story previews (Dog, Space, Castle) */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* Dog story */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            flex: "1 1 200px",
          }}
        >
          <h3>The Brave Dog</h3>
          <p>Follow a curious pup on his first big adventure.</p>
          <Link to="/demo/dog">Read this</Link>
        </div>

        {/* Space story */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            flex: "1 1 200px",
          }}
        >
          <h3>Journey to Space</h3>
          <p>Blast off on an interstellar trip full of surprises.</p>
          <Link to="/demo/space">Read this</Link>
        </div>

        {/* Castle story */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            flex: "1 1 200px",
          }}
        >
          <h3>Mystery of the Castle</h3>
          <p>Explore the hidden chambers of an old, spooky castle.</p>
          <Link to="/demo/castle">Read this</Link>
        </div>
      </div>

      {/* bonus “interactive” mock demo — just for fun */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <p>Want to try something interactive?</p>
        <Link
          to="/demo/player"
          style={{
            display: "inline-block",
            background: "#0077cc",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          🎮 Play Interactive Demo
        </Link>
      </div>
    </div>
  );
}
