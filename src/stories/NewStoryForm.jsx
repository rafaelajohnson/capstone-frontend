// src/stories/NewStoryForm.jsx
// This is where users can create a brand new story.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../api/useMutation"; // our custom hook for POST requests

export default function NewStoryForm() {
  const navigate = useNavigate();

  // track the form inputs
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  // use our hook to talk to the backend
  const { mutate, loading, error } = useMutation("POST", "/stories", [
    "/stories", // this tag makes story list refresh later
  ]);

  // when someone submits the form
  async function handleSubmit(e) {
    e.preventDefault();

    // backend expects title, topic, and pages — even if pages is empty
    const body = {
      title,
      topic,
      pages: [], // 👈 fixes the 400 error we were seeing earlier
    };

    // send it over to backend
    const result = await mutate(body);

    // if story created, take user back to the list
    if (result) navigate("/stories");
  }

  return (
    <div className="new-story-form" style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Create a New Story</h2>

      {/* small note: could later replace with dropdown of topics */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            placeholder="Something catchy..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            value={topic}
            placeholder="Adventure, Mystery, Space..."
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>

        {/* simple feedback messages */}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

        <button type="submit" disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Saving..." : "Save Story"}
        </button>
      </form>
    </div>
  );
}
