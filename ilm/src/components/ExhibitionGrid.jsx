// src/components/ExhibitionGrid.jsx
import React from 'react';

const ExhibitionGrid = () => {
  const exhibitionItems = [
    { title: '전시 제목 1', imageUrl: '/assets/images/exhibit1.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 2', imageUrl: '/assets/images/exhibit2.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 3', imageUrl: '/assets/images/exhibit3.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 4', imageUrl: '/assets/images/exhibit4.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 5', imageUrl: '/assets/images/exhibit5.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 6', imageUrl: '/assets/images/exhibit6.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 7', imageUrl: '/assets/images/exhibit7.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 8', imageUrl: '/assets/images/exhibit8.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 9', imageUrl: '/assets/images/exhibit9.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 10', imageUrl: '/assets/images/exhibit10.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 11', imageUrl: '/assets/images/exhibit11.jpg', date: '2024.11.12 ~ 2025.03.16' },
    { title: '전시 제목 12', imageUrl: '/assets/images/exhibit12.jpg', date: '2024.11.12 ~ 2025.03.16' },
  ];

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px' }}>
      {exhibitionItems.map((item, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto' }} />
          <h3>{item.title}</h3>
          <p>{item.date}</p>
        </div>
      ))}
    </section>
  );
}

export default ExhibitionGrid;
