// src/stories/StoryDog.jsx
// One of the demo stories. Just a cute feel-good story for the mock demo.
// Doesn’t connect to the backend — just static content for presentation.

import { Link } from "react-router-dom";

export default function StoryDog() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>The Brave Dog</h2>
      <img
        src="/images/dog-story.jpg"
        alt="A curious dog ready for adventure"
        style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <p>
        A curious dog wakes up one morning and decides the backyard is no longer
        enough. There’s a whole world out there — and it smells amazing.
      </p>
      <p>
        He follows a trail of butterflies, discovers a park full of friends, and
        ends the day with a new favorite stick. A simple start to a big story.
      </p>
      <Link to="/demo">← Back to Demo Menu</Link>
    </div>
  );
}
