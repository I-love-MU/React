// ✅ src/route/Router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import PerformanceDetailPage from '../pages/PerformanceDetailPage'
import PerformanceListPage from '../pages/PerformanceListPage'
import NavigationBar from '../components/NavigationBar'

const AppRouter = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/performance/:id' element={<PerformanceDetailPage />} />
        <Route path='/performances' element={<PerformanceListPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter // `export default`로 내보내기
