// src/components/Header.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header style={{ textAlign: 'right', padding: '20px' }}>
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '15px',
              fontSize: '18px',
              justifyContent: 'flex-end',
            }}
          >
            <li><a href="#theatre">THEATRE</a></li>
            <li><a href="#concert">CONCERT</a></li>
            <li><a href="#exhibition">EXHIBITION</a></li>
            <li><a href="#search">SEARCH</a></li>
            
        
       
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* 하위 라우트를 렌더링하는 Outlet */}
      </main>
    </div>
  );
};

export default Header;