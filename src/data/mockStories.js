// src/data/mockStories.js

export const mockStories = {
  dog: {
    title: "The Dog’s First Adventure",
    pages: [
      {
        id: "start",
        text: "A curious dog wakes up one morning and decides to explore the world.",
        options: [
          { text: "Chase a butterfly", next: "meadow" },
          { text: "Run to the park", next: "park" },
          { text: "Dig in the backyard", next: "yard" },
        ],
      },
      {
        id: "meadow",
        text: "The dog follows the butterfly through a meadow. Suddenly it disappears behind a tree!",
        options: [
          { text: "Climb after it", next: "climb" },
          { text: "Sit and wait", next: "wait" },
          { text: "Run back home", next: "end" },
        ],
      },
      {
        id: "park",
        text: "At the park, the dog meets another puppy and plays fetch happily.",
        options: [
          { text: "Take a nap in the sun", next: "end" },
          { text: "Keep playing", next: "end" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "yard",
        text: "Dig dig dig! The dog uncovers a hidden bone!",
        options: [
          { text: "Bury it again", next: "end" },
          { text: "Chew happily", next: "end" },
          { text: "Show it to the family", next: "end" },
        ],
      },
      {
        id: "climb",
        text: "The dog tries to climb but slips — luckily it’s soft grass below.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "wait",
        text: "The butterfly returns and lands on the dog’s nose. A magical moment!",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },

  space: {
    title: "Journey to Space",
    pages: [
      {
        id: "start",
        text: "You climb aboard a rocket ship and blast into the stars!",
        options: [
          { text: "Fly to the Moon", next: "moon" },
          { text: "Orbit Earth", next: "orbit" },
          { text: "Head toward Mars", next: "mars" },
        ],
      },
      {
        id: "moon",
        text: "You land on the Moon and discover shiny moon rocks that sparkle like diamonds.",
        options: [
          { text: "Collect some samples", next: "collect" },
          { text: "Take a space selfie", next: "selfie" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "orbit",
        text: "You float above Earth, waving at your home below. The blue oceans look so peaceful.",
        options: [
          { text: "Zoom in with your telescope", next: "telescope" },
          { text: "Wave at the ISS", next: "wave" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "mars",
        text: "You zoom past the red planet and spot alien footprints on the surface!",
        options: [
          { text: "Land and explore", next: "explore" },
          { text: "Take a photo from orbit", next: "photo" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "collect",
        text: "Your rock samples shimmer under your flashlight — mission success!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "selfie",
        text: "You snap the coolest selfie ever — you and the Earth in the background!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "telescope",
        text: "You spot your favorite city glowing in the night — it’s breathtaking!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "wave",
        text: "The astronauts on the ISS wave back — what a cosmic hello!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "explore",
        text: "You find a little alien village made of red stones — they welcome you with snacks.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "photo",
        text: "You take a perfect photo of Mars with Olympus Mons in the frame!",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },

  castle: {
    title: "The Castle Mystery",
    pages: [
      {
        id: "start",
        text: "You enter a castle filled with echoing halls and glowing torches.",
        options: [
          { text: "Open the grand door", next: "library" },
          { text: "Climb the tower", next: "tower" },
          { text: "Explore the dungeon", next: "dungeon" },
        ],
      },
      {
        id: "library",
        text: "Behind the grand door, you find a secret library full of magical books that whisper when opened.",
        options: [
          { text: "Read a glowing book", next: "read" },
          { text: "Search for secret doors", next: "secret" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "tower",
        text: "At the top of the tower, a dragon sleeps peacefully under the stars.",
        options: [
          { text: "Approach quietly", next: "approach" },
          { text: "Admire the view", next: "view" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "dungeon",
        text: "In the dungeon, you meet a friendly ghost who tells old stories of the castle’s past.",
        options: [
          { text: "Listen carefully", next: "listen" },
          { text: "Ask about the treasure", next: "treasure" },
          { text: "Go home", next: "end" },
        ],
      },
      {
        id: "read",
        text: "The book glows brighter — suddenly, you can read the language of spells!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "secret",
        text: "You pull a hidden lever, and the bookshelf opens to reveal a sparkling crown!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "approach",
        text: "The dragon opens one eye, smiles, and hands you a single golden scale.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "view",
        text: "From the tower, you see the entire kingdom glowing in moonlight — unforgettable.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "listen",
        text: "The ghost’s voice fades, leaving behind an old key — perhaps it opens the treasure room.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        id: "treasure",
        text: "You open a dusty chest and find jewels that sparkle like stars.",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },
};
