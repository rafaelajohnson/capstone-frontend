// src/stories/StoryDemo.jsx
import StoryViewer from "./StoryViewer";
import { mockStory } from "../data/mockStories";

export default function StoryDemo() {
  return (
    <div>
      <h1>✨ Demo AI Story ✨</h1>
      <p>This is a preview of how AI-driven stories will work.</p>
      <StoryViewer story={mockStory} />
    </div>
  );
}
