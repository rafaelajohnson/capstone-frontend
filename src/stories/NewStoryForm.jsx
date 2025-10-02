import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../api/useMutation";

/**
 * A form to create a brand new story with its first page + options.
 * Uses POST `/stories` endpoint from backend.
 */
export default function NewStoryForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clean up empty options
    const nonEmptyOptions = options.filter((opt) => opt.trim() !== "");

    const body = {
      title,
      topic,
      pages: [
        {
          page_number: 1,
          text,
          options: nonEmptyOptions,
        },
      ],
    };

    const success = await mutate(body);
    if (success) {
      navigate("/stories");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Story</h1>

      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Topic:
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </label>

      <label>
        First Page Text:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>

      <h3>Options (up to 3)</h3>
      {options.map((opt, i) => (
        <input
          key={i}
          value={opt}
          placeholder={`Option ${i + 1}`}
          onChange={(e) => {
            const newOpts = [...options];
            newOpts[i] = e.target.value;
            setOptions(newOpts);
          }}
        />
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Story"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
