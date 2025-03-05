import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SearchPage from '../pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    title: 'I love MU',
    children: [
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
])

export default router
