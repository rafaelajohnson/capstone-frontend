import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * PageDetail shows the story page text and a list of options.
 * Each option is clickable and routes to the next page.
 */
export default function PageDetail() {
  const { id } = useParams(); // grab page id from the URL
  const navigate = useNavigate();

  // call backend: GET /pages/:id/full
  // we pass "page-" + id as a tag so this query can be refreshed by mutations
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No page found.</p>;

  const { page, options } = data;

  return (
    <div className="page-detail">
      {/* Page text */}
      <h2>Page {page.page_number}</h2>
      <p>{page.text}</p>

      {/* Options */}
      <div className="options-list">
        {options.length === 0 && <p>No options yet.</p>}
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              // for now, just simulate moving to another page
              // later: you could store a "nextPageId" in backend
              // here we fake by navigating to /pages/{id+1}
              navigate(`/pages/${opt.page_id + 1}`);
            }}
          >
            {opt.option_text}
          </button>
        ))}
      </div>
    </div>
  );
}
