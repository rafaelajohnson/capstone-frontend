import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Login from "./auth/Login";
import Register from "./auth/Register";
import StoryList from "./stories/StoryList";
import StoryDetail from "./stories/StoryDetail";
import NewStoryForm from "./stories/NewStoryForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stories" element={<StoryList />} />
        <Route path="stories/:id" element={<StoryDetail />} />
        <Route path="new" element={<NewStoryForm />} />
      </Route>
    </Routes>
  );
}
