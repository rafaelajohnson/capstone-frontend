// src/stories/NewStoryForm.jsx
// Lets the user create a new story by giving it a title + topic.
// Automatically starts the mock AI branching story experience right after creation.

import { useState } from "react";
import { useMutation } from "../api/useMutation";
import { mockStories } from "../data/mockStories";

export default function NewStoryForm() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const { mutate, loading, error } = useMutation("/stories", "POST");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !topic.trim()) {
      alert("Please fill in both title and topic!");
      return;
    }

    try {
      // 1️⃣ Create the story in backend
      const newStory = await mutate({
        title,
        topic,
        pages: [],
      });

      if (newStory) {
        // 2️⃣ Store topic in localStorage to personalize the AI story
        localStorage.setItem("aiTopic", topic);

        // 3️⃣ Alert user and redirect to AI story experience
        alert("🎉 Story created! Your adventure begins now...");
        window.location.href = "/ai-story"; // handled by StoryAI.jsx
      }
    } catch (err) {
      console.error("❌ Error creating story:", err);
    }
  }

  return (
    <div className="floating-box">
      <h2>✨ Create Your Adventure ✨</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            placeholder="Something catchy..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            placeholder="Adventure, Mystery, Space..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #0077ff, #00d4ff)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 10px rgba(0, 200, 255, 0.4)",
          }}
        >
          {loading ? "Creating..." : "🚀 Create Story"}
        </button>
      </form>

      {error && (
        <p style={{ color: "salmon", marginTop: "1rem" }}>
          ❌ {error.message || "Something went wrong creating your story."}
        </p>
      )}
    </div>
  );
}
