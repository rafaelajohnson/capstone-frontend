import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";

/**
 * Shows the details of a specific story and its pages/options.
 * Uses `/stories/:id` for story info and `/pages/:id/full` for the first page.
 */
export default function StoryDetail() {
  const { id } = useParams();

  // fetch story metadata
  const { data: story, loading: storyLoading, error: storyError } = useQuery(
    `/stories/${id}`,
    `story-${id}`
  );

  // fetch first page + options (for now assume page 1 exists)
  const { data: pageData, loading: pageLoading, error: pageError } = useQuery(
    `/pages/${id}/full`,
    `page-${id}`
  );

  if (storyLoading || pageLoading) return <p>Loading story...</p>;
  if (storyError) return <p>Error loading story: {storyError}</p>;
  if (pageError) return <p>Error loading page: {pageError}</p>;

  return (
    <article>
      <h1>{story.title}</h1>
      <h3>Topic: {story.topic}</h3>
      <p>
        <strong>Created:</strong>{" "}
        {new Date(story.created_at).toLocaleDateString()}
      </p>

      <hr />

      {pageData && (
        <section>
          <h2>Page {pageData.page.page_number}</h2>
          <p>{pageData.page.text}</p>
          <ul>
            {pageData.options.map((opt) => (
              <li key={opt.id}>{opt.option_text}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
