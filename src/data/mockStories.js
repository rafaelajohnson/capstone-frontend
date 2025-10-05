// src/data/mockStories.js
// Prewritten branching stories that simulate AI-generated adventures.
// Each one follows a 3-layer structure: start → 3 choices → sub-scenes → ending.

export const mockStories = {
  //  DOG ADVENTURE
  dog: {
    id: "dog",
    title: "The Dog’s First Adventure",
    pages: {
      start: {
        text: "A curious dog wakes up one morning and decides to explore the world.",
        image: "/images/dog_start.jpg",
        options: [
          { text: "Chase a butterfly", next: "butterfly" },
          { text: "Run to the park", next: "park" },
          { text: "Dig in the backyard", next: "backyard" }
        ]
      },
      butterfly: {
        text: "The dog follows the butterfly through a meadow. Suddenly it disappears behind a tree!",
        image: "/images/butterfly.jpg",
        options: [
          { text: "Climb after it", next: "tree" },
          { text: "Sit and wait", next: "wait" },
          { text: "Run back home", next: "end" }
        ]
      },
      park: {
        text: "At the park, the dog meets another puppy. They sniff each other and wag tails.",
        image: "/images/park.jpg",
        options: [
          { text: "Play fetch", next: "end" },
          { text: "Run in circles", next: "end" },
          { text: "Take a nap in the sun", next: "end" }
        ]
      },
      backyard: {
        text: "Dig dig dig! The dog uncovers a hidden bone!",
        image: "/images/backyard.jpg",
        options: [
          { text: "Bury it again", next: "end" },
          { text: "Chew happily", next: "end" },
          { text: "Show it to the family", next: "end" }
        ]
      },
      tree: {
        text: "The dog tries to climb but slips — luckily it’s soft grass below.",
        image: "/images/tree.jpg",
        options: [{ text: "Go home", next: "end" }]
      },
      wait: {
        text: "The butterfly returns and lands on the dog’s nose. A magical moment!",
        image: "/images/wait.jpg",
        options: [{ text: "Go home", next: "end" }]
      },
      end: {
        text: "The adventure ends for now. But tomorrow is another day!",
        image: "/images/end.jpg",
        options: []
      }
    }
  },

  //  SPACE QUEST
  space: {
    id: "space",
    title: "Journey Through the Stars",
    pages: {
      start: {
        text: "You wake up aboard a tiny spaceship orbiting an unknown planet. The control panel blinks impatiently.",
        image: "/images/space_start.jpg",
        options: [
          { text: "Land on the planet", next: "planet" },
          { text: "Explore the asteroid belt", next: "asteroid" },
          { text: "Send a radio signal", next: "signal" }
        ]
      },
      planet: {
        text: "You descend through thick purple clouds and find glowing forests below.",
        image: "/images/planet.jpg",
        options: [
          { text: "Collect samples", next: "samples" },
          { text: "Follow strange footprints", next: "footprints" },
          { text: "Return to orbit", next: "end" }
        ]
      },
      asteroid: {
        text: "Your ship drifts between massive rocks. Suddenly, one moves on its own!",
        image: "/images/asteroid.jpg",
        options: [
          { text: "Scan the moving rock", next: "scan" },
          { text: "Evade it", next: "end" },
          { text: "Try to communicate", next: "signal" }
        ]
      },
      signal: {
        text: "You send out a distress call. Moments later, a friendly alien ship responds!",
        image: "/images/signal.jpg",
        options: [
          { text: "Dock with the ship", next: "dock" },
          { text: "Ask for directions", next: "end" },
          { text: "Invite them aboard", next: "dock" }
        ]
      },
      samples: {
        text: "You collect glowing crystals that hum with energy. Your ship’s power increases!",
        image: "/images/samples.jpg",
        options: [{ text: "Blast off home", next: "end" }]
      },
      footprints: {
        text: "The footprints lead to a tall silver being who smiles. They point to the stars—home awaits.",
        image: "/images/footprints.jpg",
        options: [{ text: "Say goodbye", next: "end" }]
      },
      scan: {
        text: "The scanner reveals the rock is alive — a massive creature floating peacefully through space.",
        image: "/images/scan.jpg",
        options: [{ text: "Wave goodbye", next: "end" }]
      },
      dock: {
        text: "The alien crew greets you warmly and offers starlight cookies. A new friendship begins.",
        image: "/images/dock.jpg",
        options: [{ text: "Celebrate with them", next: "end" }]
      },
      end: {
        text: "Your cosmic adventure ends, but the stars still call your name.",
        image: "/images/space_end.jpg",
        options: []
      }
    }
  },

  //  CASTLE MYSTERY
  castle: {
    id: "castle",
    title: "The Secret of the Whispering Castle",
    pages: {
      start: {
        text: "You arrive at an ancient castle said to be haunted. The drawbridge creaks open by itself.",
        image: "/images/castle_start.jpg",
        options: [
          { text: "Enter bravely", next: "hall" },
          { text: "Sneak through the garden", next: "garden" },
          { text: "Call out for anyone inside", next: "voice" }
        ]
      },
      hall: {
        text: "Inside the grand hall, candlelight flickers. A dusty portrait seems to watch you.",
        image: "/images/hall.jpg",
        options: [
          { text: "Inspect the portrait", next: "portrait" },
          { text: "Climb the staircase", next: "tower" },
          { text: "Open the side door", next: "cellar" }
        ]
      },
      garden: {
        text: "In the overgrown garden, a glowing rose whispers your name.",
        image: "/images/garden.jpg",
        options: [
          { text: "Pick the rose", next: "curse" },
          { text: "Follow the glow", next: "tower" },
          { text: "Run away", next: "end" }
        ]
      },
      voice: {
        text: "A faint voice answers: 'Come closer...' It’s coming from behind the throne.",
        image: "/images/voice.jpg",
        options: [
          { text: "Look behind the throne", next: "secret" },
          { text: "Hide", next: "end" },
          { text: "Shout again", next: "curse" }
        ]
      },
      portrait: {
        text: "The eyes of the portrait blink. It whispers: 'Find the key in the tower!'",
        image: "/images/portrait.jpg",
        options: [{ text: "Go to the tower", next: "tower" }]
      },
      tower: {
        text: "At the top of the tower, you find an old chest. Inside is a golden key and a friendly ghost smiling.",
        image: "/images/tower.jpg",
        options: [{ text: "Thank the ghost", next: "end" }]
      },
      cellar: {
        text: "You open the door and find a room full of dusty books and forgotten treasures.",
        image: "/images/cellar.jpg",
        options: [{ text: "Take a candle and read", next: "end" }]
      },
      curse: {
        text: "A cold wind blows and the rose turns to ashes. You sense it’s time to leave.",
        image: "/images/curse.jpg",
        options: [{ text: "Leave the castle", next: "end" }]
      },
      secret: {
        text: "Behind the throne is a hidden door leading to a sunny courtyard — you are free!",
        image: "/images/secret.jpg",
        options: [{ text: "Step into the light", next: "end" }]
      },
      end: {
        text: "The castle fades behind you as dawn breaks. The mystery remains unsolved — for now.",
        image: "/images/castle_end.jpg",
        options: []
      }
    }
  }
};
