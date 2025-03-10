import React from 'react';
import ExhibitionItem from './ExhibitionItem';

function Exhibition() {
  const exhibitions = [
    { title: "불편의 작가 반 고흐", date: "2024.11.29 ~ 2025.03.16", location: "서울", image: "image1.jpg" },
    { title: "불편의 작가 반 고흐", date: "2024.11.29 ~ 2025.03.16", location: "서울", image: "image2.jpg" },
    { title: "불편의 작가 반 고흐", date: "2024.11.29 ~ 2025.03.16", location: "서울", image: "image3.jpg" }
  ];

  return (
    <div className="exhibition">
      <h2>Exhibition</h2>
      <div className="exhibition-items">
        {exhibitions.map((exhibition, index) => (
          <ExhibitionItem key={index} {...exhibition} />
        ))}
      </div>
    </div>
  );
}

export default Exhibition;
