<<<<<<< HEAD
// src/route/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PerformanceDetailPage from '../pages/PerformanceDetailPage'
import PerformanceListPage from '../pages/PerformanceListPage'
import PerformancePage from '../pages/PerformancePage'
import NavigationBar from '../components/NavigationBar'

const AppRouter = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/performance/:id' element={<PerformanceDetailPage />} /> {/* 상세페이지 이동 */}
        <Route path='/performances/list' element={<PerformanceListPage />} /> {/* 목록 페이지 */}
        <Route path='/performances/main' element={<PerformancePage />} /> {/* 메인 페이지 */}
      </Routes>
    </Router>
  )
}

export default AppRouter