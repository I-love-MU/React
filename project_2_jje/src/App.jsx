// 📂 src/App.jsx
import React from "react";
import MainPage from "./pages/MainPage"; // 메인 페이지 import
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 스타일 추가

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
