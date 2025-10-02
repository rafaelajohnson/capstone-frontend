// App.jsx
// This file sets up all routes for the frontend.
// We include Layout (with Navbar), Auth routes, and Story routes.

import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// new imports for stories
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page */}
        <Route index element={<p>Home page</p>} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Story routes */}
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
