// src/router/Router.jsx

import MainLayout from "@/ui/layouts/MainLayout";
import RspPage from "@/ui/pages/RspPage";
import { createBrowserRouter } from "react-router-dom";
import LottoPage from "../ui/pages/LottoPage"; // LottoPage를 default로 import

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    loader: () => "로또",  // MainLayout 렌더링
    children: [
      {
        path: "/",  // "" (빈 문자열)로 수정하여 `/` 경로와 일치
        element: <LottoPage />,  // LottoPage를 자식 컴포넌트로 설정
        loader: () => "로또",
      },
      {
        path: "/rsp",  
        element: <RspPage />,  // RspPage 자식 컴포넌트로 설정
        loader: () => "가위바위보",
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
