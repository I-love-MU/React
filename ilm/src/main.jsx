import { createRoot } from 'react-dom/client'
import router from './route/Router'

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
