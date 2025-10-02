import { useParams, Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * PageDetail shows a single page’s text and its available options.
 */
export default function PageDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Page not found.</p>;

  const { page, options } = data;

  return (
    <section>
      <p>{page.text}</p>
      <h3>Choose an option:</h3>
      <ul>
        {options.map((opt) => (
          <li key={opt.id}>
            {/* Link would point to nextPageId when backend supports it */}
            <Link to={`/pages/${opt.next_page_id || id}`}>
              {opt.option_text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
