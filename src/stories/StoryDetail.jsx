// src/stories/StoryDetail.jsx
// shows one specific story and its pages.
// basically where you “read” or manage your story.

import { useParams, Link } from "react-router-dom";
import { useQuery } from "../api/useQuery"; // our GET helper

export default function StoryDetail() {
  const { id } = useParams();

  // grab the story info from the backend
  const { data: story, loading, error } = useQuery(`/stories/${id}`);

  if (loading) return <p>Loading story...</p>;
  if (error) return <p>Error loading story: {error.message}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div className="story-detail" style={{ padding: "1rem" }}>
      <h1>{story.title}</h1>
      <p><strong>Topic:</strong> {story.topic}</p>

      <hr />

      {/* show any pages if they exist */}
      {story.pages && story.pages.length > 0 ? (
        <ul>
          {story.pages.map((page) => (
            <li key={page.id}>
              <Link to={`/pages/${page.id}`}>
                Page {page.page_number}: {page.text.slice(0, 40)}...
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages yet.</p>
      )}

      {/* link to add a page (next feature, handled by PageDetail) */}
      <div style={{ marginTop: "1rem" }}>
        <Link to={`/pages/new?storyId=${story.id}`}>Add New Page</Link>
      </div>

      {/* little nav helper back to story list */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/stories">← Back to stories</Link>
      </div>
    </div>
  );
}
