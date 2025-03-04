import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AxiosClient from "./pages/AxiosClient";
import AxiosPostPage from "./pages/AxiosPostPage";
import GradeInputPage from "./pages/GradeInputPage";
import Header from "./components/Header"; // ✅ 네비게이션 추가

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* ✅ 네비게이션 바 추가 */}
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/axios-client" element={<AxiosClient />} />
        <Route path="/axios-post" element={<AxiosPostPage />} />
        <Route path="/grade-input" element={<GradeInputPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
