// src/stories/StoryCastle.jsx
// A mysterious castle story. Great to show off variety — cozy little mock content piece.

import { Link } from "react-router-dom";

export default function StoryCastle() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Mystery of the Castle</h2>
      <img
        src="/images/castle-story.jpg"
        alt="Old castle in the fog"
        style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <p>
        Fog rolls over the hills as the castle appears. The gates creak open as
        if they’ve been waiting for you. Three doors stand ahead.
      </p>
      <p>
        Behind one lies treasure, behind another — a talking crow. Which will
        you choose?
      </p>
      <Link to="/demo">← Back to Demo Menu</Link>
    </div>
  );
}
