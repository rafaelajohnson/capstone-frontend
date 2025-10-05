// src/stories/NewStoryForm.jsx
// This page lets the user make a brand-new story.
// using useMutation to send the POST request to the backend.
/// user fills in title + topic, clicks submit → we "fake" an AI start
import { useState } from "react";
import { useMutation } from "../api/useMutation";
import { useNavigate } from "react-router-dom";
import { mockStory } from "../data/mockStories";

export default function NewStoryForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation("/stories");

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // just basic check
    if (!title || !topic) return alert("Please fill all fields");

    // send the story to backend (minimal)
    const newStory = await mutate({ title, topic, pages: [] });

    // after saving, pretend AI gives the opening text
    if (newStory?.storyId) {
      alert(
        `✨ AI Suggestion:\n"${mockStory.pages.start.text}"\n\nNow add 3 options just like AI would!`
      );
      navigate("/stories");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Create a New Story</h2>

      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
      </label>

      <label>
        Topic:
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Story"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </form>
  );
}
