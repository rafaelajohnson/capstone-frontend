// This shows one page of a story (the text + choices that come next).
// Each page has 2–3 options, and clicking one moves you to the next page.
// If there are no options left, we say “The End” and let you go back.

// src/stories/PageDetail.jsx
import { useParams } from "react-router-dom";
import { mockStories } from "../data/mockStories";

export default function PageDetail() {
  const { id } = useParams();

  // just simulate fetching a page from mockStory instead of DB
  const page = mockStory.pages.start;

  return (
    <div className="floating-box">
      <h2>{mockStory.title}</h2>
      <p>{page.text}</p>
      <img
        src={page.image}
        alt={mockStory.title}
        style={{ maxWidth: "100%", borderRadius: "10px", margin: "1rem 0" }}
      />

      {/* buttons for branching */}
      <div>
        {page.options.map((opt, i) => (
          <button key={i} style={{ margin: "0.5rem" }}>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

