// src/stories/NewStoryForm.jsx
// This page lets the user make a brand-new story.
// We’re using useMutation to send the POST request to the backend.
// Keeping it simple — just a title + topic for now.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../api/useMutation";

export default function NewStoryForm() {
  // local state for form inputs — React keeps them updated as you type
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  // our helper hook for POSTing new data
  const { mutate, loading, error } = useMutation("/stories");

  // useNavigate lets us send the user back to the list after creation
  const navigate = useNavigate();

  // this runs when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault(); // stop the page from refreshing
    if (!title || !topic) return alert("Please fill out both fields!");

    // send the POST request with title + topic + empty pages array (for now)
    const result = await mutate({ title, topic, pages: [] });

    // if the backend returns a storyId, we can redirect right away
    if (result?.storyId) {
      navigate("/stories");
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Create a New Story</h1>

      {/* this form is intentionally super minimal */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Title:</strong>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Story"
              style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Topic:</strong>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Adventure, Space, Magic..."
              style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        {/* show loading or error feedback in a simple way */}
        {loading && <p>Saving your story...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
            background: "#0077cc",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Story"}
        </button>
      </form>
    </div>
  );
}
