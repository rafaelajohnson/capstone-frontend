// src/stories/PageDetail.jsx
// shows a single page of a story (like one scene).
// each page can have options that lead to other pages later.

import { useParams, Link } from "react-router-dom";
import { useQuery } from "../api/useQuery"; // our GET helper

export default function PageDetail() {
  const { id } = useParams();

  // grab this specific page
  const { data: page, loading, error } = useQuery(`/pages/${id}`);
  // also grab this page’s options (choices)
  const { data: options } = useQuery(`/options/page/${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>Error loading page: {error.message}</p>;
  if (!page) return <p>Page not found.</p>;

  return (
    <div className="page-detail" style={{ padding: "1rem" }}>
      <h2>Page {page.page_number}</h2>
      <p>{page.text}</p>

      <hr />

      {/* if this page has choices, show them */}
      <h3>Options</h3>
      {options && options.length > 0 ? (
        <ul>
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                style={{
                  background: "#eee",
                  border: "1px solid #ccc",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
                onClick={() => alert(`Pretend this goes to the next page 😄`)}
              >
                {opt.option_text}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No options yet for this page.</p>
      )}

      {/* link back just for quick nav */}
      <div style={{ marginTop: "1rem" }}>
        <Link to={`/stories/${page.story_id}`}>← Back to story</Link>
      </div>
    </div>
  );
}
