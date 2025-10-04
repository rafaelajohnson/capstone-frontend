// A simple list of mock/demo stories the user can click on.
import { Link } from "react-router-dom";

const demoStories = [
  { id: "dog", title: "The Brave Dog" },
  { id: "space", title: "Journey to Space" },
  { id: "castle", title: "Mystery of the Castle" },
];

export default function StoryDemo() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Demo Stories</h2>
      <p>Select a story to explore (mock/demo mode).</p>
      <ul>
        {demoStories.map((story) => (
          <li key={story.id}>
            <Link to={`/demo/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
