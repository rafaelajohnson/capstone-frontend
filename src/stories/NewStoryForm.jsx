import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../api/useMutation";

/**
 * NewStoryForm allows the user to create a new story with its first page + options.
 */
export default function NewStoryForm() {
  const navigate = useNavigate();
  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [pageText, setPageText] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({
      title,
      topic,
      pages: [
        {
          page_number: 1,
          text: pageText,
          options: options.filter((o) => o.trim() !== ""),
        },
      ],
    });
    if (success) navigate("/stories");
  };

  return (
    <section>
      <h1>Create a New Story</h1>
      <form onSubmit={handleSubmit}>
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
          <textarea value={pageText} onChange={(e) => setPageText(e.target.value)} required />
        </label>
        <h3>Options</h3>
        {options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            onChange={(e) =>
              setOptions(options.map((o, i) => (i === idx ? e.target.value : o)))
            }
            placeholder={`Option ${idx + 1}`}
          />
        ))}
        <button type="submit" disabled={loading}>Save Story</button>
        {error && <p>Error: {error}</p>}
      </form>
    </section>
  );
}
