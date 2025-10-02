import { useState } from "react";
import useMutation from "../api/useMutation";

/**
 * OptionForm lets the user add a new choice to a page.
 * It uses useMutation to send a POST to /options.
 */
export default function OptionForm({ pageId }) {
  const [error, setError] = useState(null);

  // Hook to handle adding a new option
  const { mutate, loading } = useMutation("POST", "/options", [`page-${pageId}`]);

  const onSubmit = async (formData) => {
    const optionText = formData.get("optionText");

    try {
      const result = await mutate({ pageId, optionText });
      if (!result) throw Error("Failed to add option");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form action={onSubmit}>
      <label>
        Add a new option
        <input type="text" name="optionText" required />
      </label>
      <button disabled={loading}>Add Option</button>
      {error && <output style={{ color: "red" }}>{error}</output>}
    </form>
  );
}
