import { createRoot } from 'react-dom/client'
import router from './route/Router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
