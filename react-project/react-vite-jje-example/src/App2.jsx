import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Header 컴포넌트 (공통 헤더)
// 모든 페이지에서 공통으로 표시되는 내비게이션 바
const Header = () => {
  return (
    <nav>
      <a href="/">홈</a> | <a href="/about">About</a> | <a href="/board/21">Board</a>
    </nav>
  );
};

// ✅ HomePage 컴포넌트 (메인 페이지)
const HomePage = () => {
  return <h1>홈 페이지</h1>;
};

// ================================================
// ✅ 2. 중첩 라우팅 (Nested Routing) 사용 예제
// /about/location → About 페이지 내부의 서브 페이지
// ================================================

// ✅ About 컴포넌트 (중첩 라우팅 포함)
const About = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용 (프로그래밍 방식으로 페이지 이동)

  return (
    <div>
      <h2>여기는 About 페이지입니다.</h2>
      <p>대충 쇼핑몰 페이지라는 뜻</p>

      {/* 버튼 클릭 시 프로필 페이지로 이동 */}
      <button onClick={() => navigate('/profile')}>프로필 페이지로 이동</button>

      {/* 버튼 클릭 시 이전 페이지로 이동 */}
      <button onClick={() => navigate(-1)}>이전 페이지로 이동</button>

      {/* 중첩 라우팅: /about/location으로 이동 시 Location 컴포넌트가 렌더링됨 */}
      <Routes>
        <Route path="location" element={<Location />} />
      </Routes>
    </div>
  );
};

// ✅ Location 컴포넌트 (중첩 페이지)
// /about/location으로 접속하면 렌더링됨
const Location = () => {
  return (
    <div>
      <h1>로케이션 컴포넌트</h1>
    </div>
  );
};

// ================================================
// ✅ 3. URL 파라미터 처리 (Dynamic Routing)
// 특정 게시글을 조회할 때 유용한 방식
// ================================================

// ✅ ProfilePage 컴포넌트 (프로필 페이지)
const ProfilePage = () => {
  return <h1>프로필 페이지</h1>;
};

// ✅ BoardPage 컴포넌트 (게시판 페이지)
// URL의 파라미터 값(:id)을 받아와서 동적으로 처리함
// 예) http://localhost:3000/board/21 → "게시판 페이지 - ID: 21" 출력
const BoardPage = () => {
  const params = useParams(); // URL의 파라미터 값을 가져오는 훅

  return <h1>게시판 페이지 - ID: {params.id}</h1>;
};

// ================================================
// ✅ 1. 전체 라우팅 설정
// ================================================
const App2 = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 홈 페이지 */}
        <Route path="/about/*" element={<About />} /> {/* About 페이지 (중첩 라우팅 포함) */}
        <Route path="/profile" element={<ProfilePage />} /> {/* 프로필 페이지 */}
        <Route path="/board/:id" element={<BoardPage />} /> {/* 게시판 페이지 (URL 파라미터 사용) */}
      </Routes>
    </BrowserRouter>
  );
};

export default App2;
