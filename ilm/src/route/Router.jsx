import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PerformancePage from '../pages/PerformancePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <PerformancePage />,
      },
    ],
  },
])

export default router
