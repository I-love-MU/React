import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import PerformanceDetailPage from './pages/PerformanceDetailPage';
import PerformanceListPage from './pages/PerformanceListPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/performance/:id" element={<PerformanceDetailPage />} />
        <Route path="/performances" element={<PerformanceListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
