// src/App.jsx
// This is where all the main routes for the frontend live.
// It includes Home, Auth (Login/Register), your story stuff, and demo story routes too.

import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

// main story files
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";
import StoryAI from "./stories/StoryAI";

// demo story files (moved directly under /stories)
import StoryDemo from "./stories/StoryDemo";
import StoryViewer from "./stories/StoryViewer";
import StoryDemoPlayer from "./stories/StoryDemoPlayer"; // this plays the mock interactive story

export default function App() {
  return (
    <Routes>
      {/* layout wraps around everything (Navbar, etc.) */}
      <Route element={<Layout />}>
        {/* landing page */}
        <Route index element={<Home />} />

        {/* auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* story pages (the real user stories) */}
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/pages/:id" element={<PageDetail />} />
        <Route path="/ai-story" element={<StoryAI />} />

        {/* demo stuff — not connected to the backend */}
        <Route path="/demo" element={<StoryDemo />} />
        <Route path="/demo/:id" element={<StoryViewer />} />
        <Route path="/demo/player" element={<StoryDemoPlayer />} />
      </Route>
    </Routes>
  );
}
