import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* AuthProvider must come first */}
    <AuthProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </AuthProvider>
  </StrictMode>
);
