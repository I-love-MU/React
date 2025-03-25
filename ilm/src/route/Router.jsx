import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import SearchPage from '../ui/pages/SearchPage'
import DetailPage from '../ui/pages/DetailPage'
import MainPage from '../ui/pages/MainPage'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => 'I love mu',
    children: [
      {
        path: '',
        element: <MainPage />,
        loader: () => '기본페이지',
      },
      {
        path: 'detail',
        element: <DetailPage />,
        loader: () => '상세페이지',
      },
      {
        path: 'search',
        element: <SearchPage />,
        loader: () => 'SEARCH',
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export { router, routes }
