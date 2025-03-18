import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../pages/MainLayout'
import DetailPage from '../pages/DetailPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: () =>'메인',
    children:  [
      {
        path:'detail',
        element:<DetailPage />,
        loader:()=>'상세페이지',
      },
    ],
  },
])

export default router
