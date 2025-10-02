// Home.jsx
// This is the landing page of the app.
// Right now it's simple, but it welcomes the user
// and gives them a quick way to explore stories.

import { Link } from "react-router";

export default function Home() {
  return (
    <section>
      <h1>Welcome to Story Builder</h1>
      <p>
        Create and explore interactive choose-your-own-adventure stories.  
        Log in to write your own, or browse the existing ones below.
      </p>

      <nav style={{ marginTop: "1.5rem" }}>
        <Link to="/stories">📖 View Stories</Link>
        <br />
        <Link to="/stories/new">➕ Create a Story</Link>
      </nav>
    </section>
  );
}
