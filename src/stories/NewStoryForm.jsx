// src/stories/NewStoryForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../api/useMutation";

/**
 * NewStoryForm
 * Form for creating a new story (title + topic).
 */
export default function NewStoryForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ title, topic });
    if (success) navigate("/stories"); // Go back to list
  };

  return (
    <section>
      <h1>Create New Story</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Topic
          <input value={topic} onChange={(e) => setTopic(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>Save</button>
        {error && <p>Error: {error}</p>}
      </form>
    </section>
  );
}
