import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// stories-related pages
import StoryList from "./stories/StoryList";      // shows all stories
import StoryDetail from "./stories/StoryDetail";  // shows a single story
import NewStoryForm from "./stories/NewStoryForm"; // form to create a story
import PageDetail from "./stories/PageDetail";    // shows a page + options

/**
 * App sets up all routes for the frontend.
 * We group everything under <Layout /> so Navbar stays on all pages.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home */}
        <Route index element={<p>Home page</p>} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Stories */}
        <Route path="/stories" element={<StoryList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />

        {/* Pages */}
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
