import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Router wrapper here
import App from "./App";
import { UserProvider } from "./context/UserContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
