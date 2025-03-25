import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import DetailPage from '../ui/pages/DetailPage'
import MainPage from '../ui/pages/MainPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: () =>'메인',
    children:  [

      {
        path:'',
        element:<MainPage />,
        loader:()=>'기본페이지',
      },
      {
        path:'detail',
        element:<DetailPage />,
        loader:()=>'상세페이지',
      },
    ],
  },
])
export default router
