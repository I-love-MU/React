import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../pages/MainLayout'
import MainPage from '../pages/MainPage'
import DetailPage from '../pages/DetailPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
        loader: () => '공연 메인 페이지',
      },
      {
        path: 'detail',
        element: <DetailPage />,
        loader: () => '상세 페이지',
      },
    ],
  },
])
export default router
