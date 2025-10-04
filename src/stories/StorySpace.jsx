// src/stories/StorySpace.jsx
// Just a fun “space adventure” demo. Makes the project feel bigger and more playful.

import { Link } from "react-router-dom";

export default function StorySpace() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Journey to Space</h2>
      <img
        src="/images/space-story.jpg"
        alt="A spaceship flying through space"
        style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <p>
        You board a small silver ship that hums like a lullaby. The stars blink
        outside the window, waiting for your first move.
      </p>
      <p>
        Will you land on Mars? Drift toward Saturn’s rings? Or keep flying
        toward the unknown?
      </p>
      <Link to="/demo">← Back to Demo Menu</Link>
    </div>
  );
}
