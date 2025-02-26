import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App.jsx";
import App2 from "./App2.jsx";

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

// 기존방식
// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   // <App />
//   <App2 />
//   // </StrictMode>
// );
