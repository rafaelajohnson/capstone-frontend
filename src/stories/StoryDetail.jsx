// src/stories/StoryDetail.jsx
// This is where a single story gets displayed.
// Basically the "Read" part of CRUD.

import { useParams, Link } from "react-router-dom";
import { useQuery } from "../api/useQuery"; // for GET requests
import { useAuth } from "../auth/AuthContext";

export default function StoryDetail() {
  const { id } = useParams(); // story id from the URL
  const { token } = useAuth();

  // fetch story details from backend
  // I like using useQuery since it handles loading + error automatically
  const { data: story, loading, error } = useQuery(`/stories/${id}`, [id]);

  // show loading state while waiting for the fetch
  if (loading) return <p>Loading story...</p>;

  // if there’s an error or no story, handle it nicely
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div className="story-detail">
      <h1>{story.title}</h1>
      <p className="topic">Topic: {story.topic}</p>

      {/* A quick note about who’s logged in — not critical but nice to show */}
      {token && <p style={{ fontSize: "0.9em" }}>You’re logged in ✔️</p>}

      {/* For now, I’m keeping this simple: just list all pages */}
      {story.pages && story.pages.length > 0 ? (
        <div className="story-pages">
          {story.pages.map((page) => (
            <div key={page.id} className="page-card">
              <h3>Page {page.page_number}</h3>
              <p>{page.text}</p>

              {/* if page has options, show them as links */}
              {page.options && page.options.length > 0 && (
                <ul>
                  {page.options.map((opt) => (
                    <li key={opt.id}>
                      <Link to={`/pages/${opt.next_page_id || page.id}`}>
                        {opt.option_text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No pages yet — maybe add one?</p>
      )}

      {/* Small navigation area */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/stories">← Back to all stories</Link>
      </div>
    </div>
  );
}
