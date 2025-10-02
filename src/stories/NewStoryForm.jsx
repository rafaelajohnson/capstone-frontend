import { useState } from "react";
import { useNavigate } from "react-router";
import useMutation from "../api/useMutation";

/**
 * NewStoryForm.jsx
 * Form to create a new story with title + topic.
 * Calls POST /stories.
 */
export default function NewStoryForm() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ title, topic, pages: [] });
    if (success) navigate("/stories"); // go back to list
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Create New Story</h1>
      <label>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Topic:
        <input value={topic} onChange={(e) => setTopic(e.target.value)} required />
      </label>
      <button type="submit" disabled={loading}>Save</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
}
