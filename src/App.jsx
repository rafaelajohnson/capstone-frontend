// src/App.jsx
// App sets up all routes for the frontend.
// Includes Home, Layout (with Navbar), Auth routes, and Story routes.

import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";

// stories
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";
import StoryDemo from "./stories/StoryDemo"; // ✅ NEW demo import

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page (always visible at root) */}
        <Route index element={<Home />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Story routes */}
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/pages/:id" element={<PageDetail />} />

        {/* Demo mock AI story */}
        <Route path="/stories/demo" element={<StoryDemo />} /> 
      </Route>
    </Routes>
  );
}
