import { Outlet, Route, Routes } from 'react-router-dom'
import routes from './route/Routes'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <div>헤더입니다</div>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Outlet />
      <div>꼬리말</div>
    </>
  )
}

export default App;
