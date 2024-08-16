import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScannedItemsProvider } from "./context/ScannedItemsContext.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScannedItemsProvider>
      <App />
      <Toaster />
    </ScannedItemsProvider>
  </StrictMode>
);
