// src/stories/PageDetail.jsx
// This one shows a single page inside a story.
// Think of it like: one moment in the adventure.

import { useParams, Link } from "react-router-dom";
import { useQuery } from "../api/useQuery";

export default function PageDetail() {
  const { id } = useParams(); // the page ID from URL

  // pulling that page data from backend
  // it fetches /pages/:id
  const { data: pages, loading, error } = useQuery(`/pages/${id}`, [id]);

  // still loading? let’s not leave the user hanging
  if (loading) return <p>Loading this page...</p>;

  // if something blows up (bad fetch or missing id)
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  // sometimes API returns an empty array, so just handle that too
  if (!pages || pages.length === 0) return <p>Page not found.</p>;

  // right now, /pages/:id gives us an array of pages (by story id),
  // so let's just grab the first page for now (since it's the one we want)
  const page = pages[0];

  return (
    <div className="page-detail">
      <h2>Page {page.page_number}</h2>
      <p>{page.text}</p>

      {/* if this page has options, show them */}
      {page.options && page.options.length > 0 ? (
        <ul>
          {page.options.map((opt) => (
            <li key={opt.id}>
              {/* each option could point to another page */}
              <Link to={`/pages/${opt.next_page_id || page.id}`}>
                {opt.option_text}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // simple fallback: no options yet
        <p>Nothing to choose here — the story might end here or need more options.</p>
      )}

      {/* simple nav link back to story list */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/stories">← Back to all stories</Link>
      </div>
    </div>
  );
}
