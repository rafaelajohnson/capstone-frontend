// src/data/mockStories.js
export const mockStories = {
  dog: {
    title: "The Dog’s First Adventure",
    pages: [
      {
        text: "A curious dog wakes up one morning and decides to explore the world.",
        options: [
          { text: "Chase a butterfly", next: 1 },
          { text: "Run to the park", next: 2 },
          { text: "Dig in the backyard", next: 3 },
        ],
      },
      {
        text: "The dog follows the butterfly through a meadow.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "At the park, the dog meets another puppy and plays fetch.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "Dig dig dig! The dog uncovers a hidden bone!",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },
  space: {
    title: "Journey to Space",
    pages: [
      {
        text: "You climb aboard a rocket ship and blast into the stars!",
        options: [
          { text: "Fly to the Moon", next: 1 },
          { text: "Orbit Earth", next: 2 },
          { text: "Head toward Mars", next: 3 },
        ],
      },
      {
        text: "You land on the Moon and discover shiny moon rocks!",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "You float above Earth, waving at your home below.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "You zoom past the red planet and spot alien footprints!",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },
  castle: {
    title: "The Castle Mystery",
    pages: [
      {
        text: "You enter a castle filled with echoing halls and glowing torches.",
        options: [
          { text: "Open the grand door", next: 1 },
          { text: "Climb the tower", next: 2 },
          { text: "Explore the dungeon", next: 3 },
        ],
      },
      {
        text: "Behind the door, you find a hidden library of magical books.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "At the top of the tower, a dragon sleeps peacefully.",
        options: [{ text: "Go home", next: "end" }],
      },
      {
        text: "The dungeon reveals a friendly ghost who tells old stories.",
        options: [{ text: "Go home", next: "end" }],
      },
    ],
  },
};
