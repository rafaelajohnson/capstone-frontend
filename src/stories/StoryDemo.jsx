// This one is just a "preview" mock for presentation.
import StoryDog from "./StoryDog";
import StorySpace from "./StorySpace";
import StoryCastle from "./StoryCastle";

export default function StoryDemo() {
  return (
    <div>
      <h1>✨ Story Demo</h1>
      <p>Pick a sample story to see how it would look after generation.</p>

      <div className="story-grid">
        <StoryDog />
        <StorySpace />
        <StoryCastle />
      </div>
    </div>
  );
}
