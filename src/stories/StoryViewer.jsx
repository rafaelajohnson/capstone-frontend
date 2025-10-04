// This page shows whichever mock story the user clicks in StoryDemo.
// Each story has some sample text + an optional image to make it feel "AI-generated".

import { useParams, Link } from "react-router-dom";

// Simple hardcoded demo stories for now
// Later, these could come from the database or an AI prompt result.
const storyContent = {
  dog: {
    title: "The Brave Dog",
    text: "Once upon a time, a brave dog met his best friend for the first time...",
    image: "/images/dog-story.jpg", // placeholder for demo
  },
  space: {
    title: "Journey to Space",
    text: "You board a spaceship and head off to the stars. Where will you go?",
    image: "/images/space-story.jpg",
  },
  castle: {
    title: "Mystery of the Castle",
    text: "A castle stands tall in the mist. Inside, three doors await you...",
    image: "/images/castle-story.jpg",
  },
};

export default function StoryViewer() {
  const { id } = useParams(); // pulls the story id from the URL
  const story = storyContent[id]; // looks up the story by id

  // If someone types an invalid id in the URL, this shows a friendly fallback
  if (!story) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Story not found</h2>
        <Link to="/demo">← Back to demo stories</Link>
      </div>
    );
  }

  // Otherwise, show the story details
  return (
    <div style={{ padding: "1rem" }}>
      <h2>{story.title}</h2>

      {/* Only show an image if one exists for the mock */}
      {story.image && (
        <img
          src={story.image}
          alt={story.title}
          style={{ maxWidth: "400px", display: "block", marginBottom: "1rem" }}
        />
      )}

      <p>{story.text}</p>

      {/* simple link to go back to demo screen */}
      <Link to="/demo">← Back to demo stories</Link>
    </div>
  );
}
