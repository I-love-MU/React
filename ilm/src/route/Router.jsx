import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../pages/MainLayout'
import DetailPage from '../pages/DetailPage'
import MainPage from '../pages/MainPage'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: () =>'메인',
    children:  [

      {
        path:'',
        element:<MainPage />,
        loader:()=>'메인',
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
