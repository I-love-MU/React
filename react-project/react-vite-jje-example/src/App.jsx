import routes from "./route/Routes";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AxiosClient from "./pages/AxiosClient";
import AxiosPostPage from "./pages/AxiosPostPage";
import GradeInputPage from "./pages/GradeInputPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: "10px" }}>
        <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | 
        <Link to="/axios-client">Axios Client</Link> | <Link to="/axios-post">Axios Post</Link> | 
        <Link to="/grade-input">성적 입력</Link>
      </nav>
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
