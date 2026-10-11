
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Smoothly dismiss the initial loading screen once React executes
const loader = document.getElementById("initial-loader");
if (loader) {
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.visibility = "hidden";
    loader.remove();
  }, 400);
}

  