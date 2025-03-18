// 📌 src/route/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PerformanceCarousel from "../components/PerformanceCarousel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    title: "router",
    children: [
      { path: "carousel", element: <PerformanceCarousel /> },
    ],
  },
]);

export { router };
