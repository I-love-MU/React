// src/components/ExhibitionBanner.jsx
import React from 'react';

const ExhibitionBanner = () => {
  return (
    <section
      style={{
        position: 'relative', // 부모 요소를 기준으로 자식 요소 위치 설정
        textAlign: 'center',
        margin: '20px 0',
      }}
    >
      <img
        src="src/imgs/banner.jpg"
        alt="Exhibition Banner"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <h1
        style={{
          position: 'absolute', // 부모 요소를 기준으로 위치 설정
          top: '10%', // 세로 중앙 정렬
          left: '50%', // 가로 중앙 정렬
          transform: 'translate(-50%, -50%)', // 중앙 정렬 보정
          color: 'black',
          fontSize: '3rem',
        
         
        }}
      >
        EXHIBITION
      </h1>
    </section>
  );
};

export default ExhibitionBanner;