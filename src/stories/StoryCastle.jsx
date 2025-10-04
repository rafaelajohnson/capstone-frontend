// Simple castle fantasy – we’re showing how branching could work visually.

export default function StoryCastle() {
    return (
      <div className="story-card">
        <h2>🏰 Castle Quest</h2>
        <p>
          You stand before the castle gates at dawn. A guard blocks your path and
          asks for a password. A storm brews behind you.
        </p>
        <ul>
          <li>Try to sneak around</li>
          <li>Talk to the guard</li>
          <li>Cast a spell to open the gate</li>
        </ul>
      </div>
    );
  }
  