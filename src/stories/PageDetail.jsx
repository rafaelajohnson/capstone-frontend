import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * PageDetail shows a single story page and all of its options.
 * The pageId comes from the URL (/pages/:id).
 */
export default function PageDetail() {
  const { id } = useParams(); // grabs :id from URL
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No page found.</p>;

  return (
    <div>
      <h2>Page {data.page.page_number}</h2>
      <p>{data.page.text}</p>

      <h3>Options</h3>
      <ul>
        {data.options.map((opt) => (
          <li key={opt.id}>{opt.option_text}</li>
        ))}
      </ul>
    </div>
  );
}
