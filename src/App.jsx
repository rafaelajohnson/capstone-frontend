import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page */}
        <Route index element={<p>Home page</p>} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Stories */}
        <Route path="/stories" element={<StoriesList />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/stories/new" element={<NewStoryForm />} />
      </Route>
    </Routes>
  );
}
