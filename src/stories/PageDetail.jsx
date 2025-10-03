// src/stories/PageDetail.jsx
import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * PageDetail
 * Shows a story page (text + options to continue).
 */
export default function PageDetail() {
  const { id } = useParams();

  // GET /pages/:id/full -> { page, options }
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>Error: {error}</p>;

  const { page, options } = data;

  return (
    <section>
      <h1>Page {page.page_number}</h1>
      <p>{page.text}</p>

      <ul>
        {options.map((opt) => (
          <li key={opt.id}>
            <Link to={`/pages/${opt.next_page_id || id}`}>
              {opt.option_text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
