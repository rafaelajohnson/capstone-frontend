import { useState } from "react";
import useMutation from "../api/useMutation";

/**
 * OptionForm allows adding a new option to a page.
 */
export default function OptionForm({ pageId, onCreated }) {
  const { mutate, loading, error } = useMutation("POST", `/options`, [`page-${pageId}`]);
  const [optionText, setOptionText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ pageId, optionText });
    if (success) {
      setOptionText("");
      onCreated?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Option
        <input
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>Add Option</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
}
