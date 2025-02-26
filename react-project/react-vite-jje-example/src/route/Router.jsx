import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import App from '../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        children: [{ path: 'home', element: <HomePage /> }],
      },
    ],
  },
])
export default router
