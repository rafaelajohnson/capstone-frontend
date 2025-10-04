// StoryViewer.jsx
// When a user clicks one of the demo stories, this page shows that story’s content.
// For now, it’s mock data (pretending to be AI-generated), just to make the app feel real.

import { useParams, Link } from "react-router-dom";

// just a few prebuilt stories so the app has something to display
const storyContent = {
  dog: {
    title: "The Brave Dog",
    text: "Once upon a time, a curious dog wandered off and found a friend who needed help.",
    image: "/images/dog-story.jpg", // optional image placeholder
  },
  space: {
    title: "Journey to Space",
    text: "You strap into a ship and launch into orbit. The Earth fades below as stars fill the window.",
    image: "/images/space-story.jpg",
  },
  castle: {
    title: "Mystery of the Castle",
    text: "A tall, misty castle looms before you. Inside, three doors glow with strange colors...",
    image: "/images/castle-story.jpg",
  },
};

export default function StoryViewer() {
  const { id } = useParams(); // grab the story id from the URL
  const story = storyContent[id]; // get the right story object

  // if the id doesn’t match any of the demo ones, we just show a “not found” message
  if (!story) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h2>Story not found</h2>
        <p>Looks like that one doesn’t exist yet!</p>
        <Link to="/demo" style={{ color: "teal" }}>
          ← Back to demo stories
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      {/* Title + optional image */}
      <h2>{story.title}</h2>

      {story.image && (
        <img
          src={story.image}
          alt={story.title}
          style={{
            maxWidth: "400px",
            display: "block",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        />
      )}

      {/* Main story text */}
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{story.text}</p>

      {/* Small link back to the demo list */}
      <Link to="/demo" style={{ color: "teal" }}>
        ← Back to demo stories
      </Link>
    </div>
  );
}
