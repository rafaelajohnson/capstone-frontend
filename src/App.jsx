import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// stories section
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";

/**
 * App sets up all the routes for our frontend.
 * Every route is wrapped in Layout (so Navbar stays consistent).
 */
export default function App() {
  return (
    <Routes>
      {/* Layout is the wrapper, includes Navbar + Outlet */}
      <Route element={<Layout />}>
        {/* Default homepage */}
        <Route index element={<p>Home page</p>} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Stories routes */}
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
