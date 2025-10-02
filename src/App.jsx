import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// story components
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";

/**
 * App sets up all routes for the frontend.
 * Each path points to a component that handles its logic.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page shows all stories */}
        <Route index element={<StoriesList />} />

        {/* User auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Story routes */}
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />

        {/* Page routes (each story page with its options) */}
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
