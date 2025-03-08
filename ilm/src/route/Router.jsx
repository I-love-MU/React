import { createBrowserRouter } from 'react-router-dom'
import Exhibition from '../Exhibition'
import ExhibitionItem from '../Exhibitionitem'
import '../Exhibition.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Exhibition />,
    
    children: [],
  },
])

export default router
