import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { fetchPerformanceData } from "../api/publicApi";  // ✅ API 파일명 변경

const CarouselComponent = () => {
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    fetchPerformanceData(10).then((data) => {
      if (data && data.length > 0) {
        setPerformances(data);
      } else {
        console.warn("⚠️ 공연 데이터를 불러올 수 없습니다.");
      }
    });
  }, []);

  return (
    <Carousel>
      {performances.length > 0 ? (
        performances.map((performance, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={performance.poster || "/default.jpg"}  // 포스터 URL
              alt={performance.prfnm}  // 공연명
            />
            <Carousel.Caption>
              <h3>{performance.prfnm}</h3>
              <p>공연 기간: {performance.prfpdfrom} ~ {performance.prfpdto}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      ) : (
        <p>🎭 공연 정보를 불러오는 중...</p>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
