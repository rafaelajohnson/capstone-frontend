import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// stories-related pages
import StoryList from "./stories/StoryList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";

/**
 * App sets up all routes for the frontend.
 * I’m using <Layout> so Navbar + Outlet render on every page.
 * Each child route below corresponds to a feature we’ve built.
 */
export default function App() {
  return (
    <Routes>
      {/* Layout wraps everything with navbar and <Outlet /> */}
      <Route element={<Layout />}>
        {/* Home route just shows a placeholder for now */}
        <Route index element={<p>Home page</p>} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Stories CRUD */}
        <Route path="/stories" element={<StoryList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />

        {/* Pages inside stories */}
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
