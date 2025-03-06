import MainLayout from "@/ui/layouts/MainLayout";
import BoardPage from "@/ui/pages/BoardPage";
import RspPage from "@/ui/pages/RspPage";
import { createBrowserRouter } from "react-router-dom";
import LottoPage from "../ui/pages/LottoPage"; // LottoPage를 default로 import

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    loader: () => '로또',
    children: [
      {
        path: "/",  // "/"를 명시적으로 지정
        element: <LottoPage />,
        label: "로또",
      },
      {
        path: "rsp",  // 부모 경로("/")가 있어서 상대경로로 설정
        element: <RspPage />,
        label: "가위바위보",
      },
      {
        path: "boards",  // 부모 경로("/")가 있어서 상대경로로 설정
        element: <BoardPage />,
        label: "게시판",
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
