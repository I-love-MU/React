import React, { useState, useEffect } from "react";

const Carousel = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, [totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIdx = currentPage * itemsPerPage;
  const displayedItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="carousel-container">
      <button className="prev-btn" onClick={handlePrev}>◀</button>
      <div className="carousel-content">
        {displayedItems.map((item, index) => (
          <div key={index} className="carousel-item">
            <img src={item.poster || "https://via.placeholder.com/150"} alt={item.prfnm} />
            <h4>{item.prfnm}</h4>
          </div>
        ))}
      </div>
      <button className="next-btn" onClick={handleNext}>▶</button>
    </div>
  );
};

export default Carousel;
