import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SearchForm from '../ui/components/SearchForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    title: 'I love MU',
    children: [
      {
        path: 'search',
        element: <SearchForm />,
      },
    ],
  },
])

export default router
