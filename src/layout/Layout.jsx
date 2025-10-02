import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Layout is basically the "frame" of the app.
 * Navbar is always on top, and Outlet swaps out
 * the current page depending on the route.
 */
export default function Layout() {
  return (
    <>
      {/* Navbar sits on top of every page */}
      <Navbar />

      {/* Outlet is where the child route renders.
          Example: if the path is /login, the Login.jsx
          page will show up here inside the layout. */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
