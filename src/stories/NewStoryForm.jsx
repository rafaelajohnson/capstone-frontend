// src/stories/NewStoryForm.jsx
// lets the user create a brand new story and send it to the backend.

import { useState } from "react";
import { useMutation } from "../api/useMutation"; // our POST helper
import { useNavigate } from "react-router-dom";

export default function NewStoryForm() {
  // local form state — pretty basic stuff
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  // navigate helps us send user back to story list after creating one
  const navigate = useNavigate();

  // useMutation handles the POST call for creating stories
  const { mutate, loading, error } = useMutation("/stories");

  async function handleSubmit(e) {
    e.preventDefault();

    // quick sanity check before calling backend
    if (!title.trim() || !topic.trim()) {
      alert("Both title and topic are required!");
      return;
    }

    try {
      // send the new story to backend
      await mutate({
        method: "POST",
        body: JSON.stringify({ title, topic, pages: [] }),
      });

      // once it's saved, take user back to story list
      navigate("/stories");
    } catch (err) {
      console.error("❌ Error creating story:", err);
    }
  }

  return (
    <div className="new-story-form">
      <h1>Create a New Story</h1>

      {/* if backend complains, show it in plain English */}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Something catchy..."
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Adventure, Mystery, Space..."
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Story"}
        </button>
      </form>
    </div>
  );
}
