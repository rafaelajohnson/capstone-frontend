import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import StoriesList from "./stories/StoriesList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";
import PageDetail from "./pages/PageDetail";
import OptionForm from "./pages/OptionForm";

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
        <Route path="/stories/new" element={<NewStoryForm />} />
        <Route path="/stories/:id" element={<StoryDetail />} />

        {/* Pages + Options */}
        <Route path="/pages/:id" element={<PageDetail />} />
        <Route path="/pages/:id/options/new" element={<OptionForm />} />
      </Route>
    </Routes>
  );
}
