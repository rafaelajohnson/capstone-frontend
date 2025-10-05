// src/data/mockStories.js
// Pretend AI-generated story with branching paths

export const mockStory = {
  id: "demo1",
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
};
