// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// 🛡️ Disable right-click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// // 🛡️ Disable key combos like F12, Ctrl+Shift+I, etc.
// document.addEventListener("keydown", (e) => {
//   if (
//     e.key === "F12" ||
//     (e.ctrlKey &&
//       e.shiftKey &&
//       (e.key === "I" || e.key === "J" || e.key === "C")) ||
//     (e.ctrlKey && e.key === "U")
//   ) {
//     e.preventDefault();
//   }
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
