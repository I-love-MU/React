// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header style={{ textAlign: 'right', padding: '20px' }}>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', fontSize: '18px', justifyContent: 'flex-end', }}>
          <li><a href="#theatre">THEATRE</a></li>
          <li><a href="#concert">CONCERT</a></li>
          <li><a href="#exhibition">EXHIBITION</a></li>
          <li><a href="#search">SEARCH</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
