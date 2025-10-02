import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../api/useMutation";

/**
 * NewStoryForm allows creating a new story with one starting page.
 * Keeps it minimal so you can test story creation end-to-end.
 */
export default function NewStoryForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({
      title,
      topic,
      pages: [
        {
          page_number: 1,
          text,
          options: [],
        },
      ],
    });
    if (success) navigate("/stories");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Story</h1>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Topic
        <input value={topic} onChange={(e) => setTopic(e.target.value)} required />
      </label>
      <label>
        First Page Text
        <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Story"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
