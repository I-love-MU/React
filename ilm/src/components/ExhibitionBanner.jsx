// src/components/ExhibitionBanner.jsx
import React from 'react';


const ExhibitionBanner = () => {
  return (
    <section style={{ textAlign: 'center', margin: '20px 0' }}>
      <img src="src/public/images/exhibition-banner.jpg" alt="Exhibition Banner" style={{ width: '100%', height: 'auto' }} />
      <h1 
        style={{
          position: 'absolute', 
          top: '8.5%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          color: 'black', 
          fontSize: '3rem', 
          
        }}
      >
        EXHIBITION
      </h1>
    </section>
  );
}

export default ExhibitionBanner;
