// src/stories/NewStoryForm.jsx
// Lets the user create a new story by giving it a title + topic.
// Automatically starts the mock AI branching story experience right after creation.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { mockStories } from "../data/mockStories";

export default function NewStoryForm() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const chosenKey =
        topic.toLowerCase().includes("dog")
          ? "dog"
          : topic.toLowerCase().includes("space")
          ? "space"
          : topic.toLowerCase().includes("castle")
          ? "castle"
          : "dog";
  
      const mockStory = mockStories[chosenKey];
  
      const payload = {
        title: title || mockStory.title,
        topic: topic || chosenKey,
        pages: mockStory.pages || [],
      };
  
      console.log("📤 Sending story data:", payload);
  
      const storyRes = await fetch(`${import.meta.env.VITE_API_URL}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      console.log("📬 Response status:", storyRes.status);
  
      const text = await storyRes.text();
      console.log("📩 Response text:", text);
  
      if (!storyRes.ok) {
        throw new Error(`Failed to create story (${storyRes.status})`);
      }
  
      alert("🎉 Story created! Launching your new story...");
  
      // NEW navigate logic
      let storyId = null;
      try {
        const parsed = JSON.parse(text);
        storyId = parsed.storyId || parsed.id;
      } catch (e) {
        console.warn("Could not parse response JSON, falling back to My Stories");
      }
  
      if (storyId) {
        navigate(`/stories/${storyId}?topic=${topic.toLowerCase()}`);
      } else {
        navigate("/stories");
      }
    } catch (err) {
      console.error("❌ Error creating story:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="floating-box">
      <h2>✨ Create Your Adventure ✨</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Something catchy..."
            required
          />
        </label>
        <label>
          Topic
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Dog, Space, Castle..."
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "1rem", width: "100%" }}
        >
          {loading ? "⏳ Creating..." : "🚀 Create Story"}
        </button>

        {error && (
          <p style={{ color: "salmon", marginTop: "1rem" }}>
            ⚠️ {error || "Failed to create story"}
          </p>
        )}
      </form>
    </div>
  );
}
