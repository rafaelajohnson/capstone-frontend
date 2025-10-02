import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import StoryList from "./stories/StoryList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./stories/PageDetail";

/**
 * App sets up all routes for the frontend.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stories" element={<StoryList />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/pages/:id" element={<PageDetail />} />
      </Route>
    </Routes>
  );
}
