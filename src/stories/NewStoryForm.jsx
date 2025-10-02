import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../api/useMutation";

/**
 * NewStoryForm lets the user create a new story.
 * For MVP, we only allow 1 starting page + a couple options.
 * Later we can expand to add multiple pages, but this gives us CRUD coverage.
 */
export default function NewStoryForm() {
  const navigate = useNavigate();

  // useMutation will POST a new story and invalidate the "stories" tag so list refreshes
  const { mutate, loading, error } = useMutation("POST", "/stories", ["stories"]);

  // local state for form fields
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState([""]);

  // adds a new option field
  const addOption = () => setOptions([...options, ""]);

  // handles input changes for each option
  const updateOption = (idx, value) => {
    const next = [...options];
    next[idx] = value;
    setOptions(next);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // shape body exactly like backend expects
    const body = {
      title,
      topic,
      pages: [
        {
          page_number: 1,
          text,
          options: options.filter((opt) => opt.trim() !== ""), // only keep non-empty
        },
      ],
    };

    const success = await mutate(body);
    if (success) {
      navigate("/stories"); // go back to list after creating
    }
  };

  return (
    <section>
      <h1>Create a New Story</h1>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Topic
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
        <label>
          First Page Text
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>

        <fieldset>
          <legend>Options (choices for this page)</legend>
          {options.map((opt, idx) => (
            <input
              key={idx}
              value={opt}
              onChange={(e) => updateOption(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
            />
          ))}
          <button type="button" onClick={addOption}>
            ➕ Add Option
          </button>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Story"}
        </button>
        {error && <output style={{ color: "red" }}>{error}</output>}
      </form>
    </section>
  );
}
