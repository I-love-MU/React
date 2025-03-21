// src/route/Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import ExhibitionBanner from '../components/ExhibitionBanner';
import ExhibitionGrid from '../components/ExhibitionGrid';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />, // Header 컴포넌트를 최상위로 렌더링
    children: [
      {
        path: '', // 기본 경로에서 렌더링
        element: (
          <>
            <ExhibitionBanner />
            <ExhibitionGrid />
          </>
        ), // ExhibitionBanner와 ExhibitionGrid를 동시에 렌더링
      },
    ],
  },
]);

export default router;