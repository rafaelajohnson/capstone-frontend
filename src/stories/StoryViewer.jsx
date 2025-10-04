// src/stories/StoryViewer.jsx
import { useState } from "react";

export default function StoryViewer({ story }) {
  const [pageKey, setPageKey] = useState("start");
  const page = story.pages[pageKey];

  return (
    <section>
      <h2>{story.title}</h2>
      <img
        src={page.image}
        alt="story scene"
        style={{ maxWidth: "400px", display: "block", marginBottom: "1rem" }}
      />
      <p>{page.text}</p>

      <ul>
        {page.options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => setPageKey(opt.next)}>{opt.text}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
