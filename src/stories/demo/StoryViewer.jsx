// Displays the chosen demo story based on its id
import { useParams, Link } from "react-router-dom";

const storyContent = {
  dog: {
    title: "The Brave Dog",
    text: "Once upon a time, a brave dog met his best friend for the first time...",
    image: "/images/dog-story.jpg", // optional placeholder
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
  const { id } = useParams();
  const story = storyContent[id];

  if (!story) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Story not found</h2>
        <Link to="/demo">← Back to demo stories</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{story.title}</h2>
      {story.image && (
        <img
          src={story.image}
          alt={story.title}
          style={{ maxWidth: "400px", display: "block", marginBottom: "1rem" }}
        />
      )}
      <p>{story.text}</p>
      <Link to="/demo">← Back to demo stories</Link>
    </div>
  );
}
