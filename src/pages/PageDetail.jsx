import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import OptionForm from "./OptionForm";

/**
 * PageDetail shows a single page of a story with its options.
 * It also includes the OptionForm so the user can add new choices.
 */
export default function PageDetail() {
  const { id } = useParams(); // page id from the URL

  // Grab the page and its options from the API
  const { data, loading, error } = useQuery(`/pages/${id}/full`, `page-${id}`);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>No page found.</p>;

  const { page, options } = data;

  return (
    <section>
      <h2>Page {page.page_number}</h2>
      <p>{page.text}</p>

      <h3>Options</h3>
      <ul>
        {options.map((opt) => (
          <li key={opt.id}>{opt.option_text}</li>
        ))}
      </ul>

      {/* Add form for adding a new option to this page */}
      <OptionForm pageId={page.id} />
    </section>
  );
}
