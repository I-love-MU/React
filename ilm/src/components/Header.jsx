// src/components/Header.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header style={{ textAlign: "right", padding: "20px" }}>
        <nav>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "15px",
              fontSize: "18px",
              justifyContent: "flex-end",
            }}
          >
            <li>
              <a href="#theatre" style={{ textDecoration: "none", color: "black" }}>
                THEATRE
              </a>
            </li>
            <li>
              <a href="#concert" style={{ textDecoration: "none", color: "black" }}>
                CONCERT
              </a>
            </li>
            <li>
              <a href="#exhibition" style={{ textDecoration: "none", color: "black" }}>
                EXHIBITION
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* 자식 컴포넌트를 렌더링 */}
      </main>
    </div>
  );
};

export default Header;