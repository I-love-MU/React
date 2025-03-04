import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import BoardPage from "../pages/BoardPage";
import HelloPage from "../pages/HelloPage";
import JSXPage from "../pages/JSXPage";
import ConditionalPage from "../pages/ConditionalPage";
import BootStrapPage from "../pages/BootStrapPage";
import PropsPage from "../pages/PropsPage";
import CounterPage from "../pages/CounterPage";
import UseEffectPage from "../pages/UseEffectPage";
import UseRef1Page from "../pages/UseRef1Page";
import UseRef2Page from "../pages/UseRef2Page";
import AxiosGetPage from "../pages/AxiosGetPage";
import AxiosPostPage from "../pages/AxiosPostPage";
import AxiosClient from "../pages/AxiosClient";
import InputPage from "../pages/InputPage";
import GradeInputPage from "../pages/GradeInputPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "board", element: <BoardPage /> },
      { path: "hello", element: <HelloPage /> },
      { path: "jsx", element: <JSXPage /> },
      { path: "conditional", element: <ConditionalPage /> },
      { path: "bootstrap", element: <BootStrapPage /> },
      { path: "props", element: <PropsPage /> },
      { path: "usestate", element: <CounterPage /> },
      { path: "useeffect", element: <UseEffectPage /> },
      { path: "useRef1", element: <UseRef1Page /> },
      { path: "useRef2", element: <UseRef2Page /> },
      { path: "axiosget", element: <AxiosGetPage /> },
      { path: "axiospost", element: <AxiosPostPage /> },
      { path: "axiosclient", element: <AxiosClient /> },
      { path: "input", element: <InputPage /> },
      { path: "gradeinput", element: <GradeInputPage /> },
    
    ],
  },
]);

export default router;
