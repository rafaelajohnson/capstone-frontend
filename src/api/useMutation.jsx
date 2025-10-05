// src/api/useMutation.jsx
// This hook is for sending POST/PUT/DELETE requests — basically anything that *changes* data.
// It’s the action twin of useQuery.jsx (which just *gets* data).
// Keeping it hand-coded means we can control exactly how loading and errors behave.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../api/useMutation";
import { mockStories } from "../data/mockStories";

export default function NewStoryForm() {
  const { mutate } = useMutation("/stories");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const key =
        topic.toLowerCase().includes("dog")
          ? "dog"
          : topic.toLowerCase().includes("space")
          ? "space"
          : "castle";

      const storyData = mockStories[key];
      if (!storyData) throw new Error("Invalid topic");

      // Send the story to backend
      const createdStory = await mutate({
        title: storyData.title || title,
        topic,
        pages: storyData.pages,
      });

      alert("🎉 Story created! Check 'My Stories' to view it.");
      navigate("/stories");
    } catch (err) {
      console.error("❌ Error creating story:", err);
      alert("Failed to create story.");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title..."
            required
          />
        </label>
        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Dog, Space, or Castle..."
            required
          />
        </label>
        <button type="submit" className="button">
          🚀 Create Story
        </button>
      </form>
    </div>
  );
}
