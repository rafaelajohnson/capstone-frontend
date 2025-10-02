import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * PageDetail shows a single story page (text + options).
 * It fetches from /pages/:id/full and lists choices the reader can pick.
 */
export default function PageDetail() {
  const { id } = useParams(); // page id from the URL
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading page: {error}</p>;
  if (!data) return <p>Page not found.</p>;

  const { page, options } = data;

  return (
    <div>
      <h2>Page {page.page_number}</h2>
      <p>{page.text}</p>

      <h3>Choose an option:</h3>
      {options.length > 0 ? (
        <ul>
          {options.map((opt) => (
            <li key={opt.id}>
              {/* Later we can hook these to actual next pages, 
                  for now they’re just plain text choices */}
              <button>{opt.option_text}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No options available for this page.</p>
      )}

      <br />
      <Link to="/stories">← Back to all stories</Link>
    </div>
  );
}
