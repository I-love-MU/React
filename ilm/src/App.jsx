import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'
import PerformanceDetailPage from './pages/PerformanceDetailPage'
import PerformanceListPage from './pages/PerformanceListPage'
import LoginPage from './pages/LoginPage'
import MyPage from './pages/MyPage'
import PerformancePage from './pages/PerformancePage'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/performance/:id' element={<PerformanceDetailPage />} />
        <Route path='/performances/main' element={<PerformancePage />} />
      </Routes>
    </Router>
  )
}

export default App
