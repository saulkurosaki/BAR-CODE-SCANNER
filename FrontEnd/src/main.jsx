import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScannedItemsProvider } from "./context/ScannedItemsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScannedItemsProvider>
      <App />
    </ScannedItemsProvider>
  </StrictMode>
);
