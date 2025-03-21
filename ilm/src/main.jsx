import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import { router } from './route/Router'

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)

const script = document.createElement('script')
script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
script.async = true
document.head.appendChild(script)
