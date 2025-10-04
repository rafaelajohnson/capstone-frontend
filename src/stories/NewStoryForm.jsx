// src/stories/NewStoryForm.jsx
// This is the form for making a brand new story.
// Basically the “Create” part of CRUD.

import { useState } from "react";
import { useMutation } from "../api/useMutation"; // handles POST/PUT/DELETE
import { useNavigate } from "react-router-dom";

export default function NewStoryForm() {
  const navigate = useNavigate();

  // simple local state for title and topic inputs
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  // useMutation lets me do a POST request and track loading/error
  const { mutate, loading, error } = useMutation("POST", "/stories");

  // when user submits the form
  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    try {
      // send title + topic to backend
      const result = await mutate({ title, topic, pages: [] });

      // once story is created, go straight to that story’s detail page
      navigate(`/stories/${result.storyId}`);
    } catch (err) {
      console.error("Error creating story:", err);
    }
  }

  return (
    <div className="new-story">
      <h1>Start a New Story</h1>

      {/* I kept it simple — just a small form with 2 fields */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title..."
            required
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Like ‘Adventure’, ‘Fantasy’, etc."
            required
          />
        </label>

        {/* Button says “Creating...” when it’s loading */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Story"}
        </button>
      </form>

      {/* If backend errors out, I just show it here */}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}
