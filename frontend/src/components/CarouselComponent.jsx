import React, { useEffect, useState } from "react";
import { fetchKopisData } from "../api/kopisApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Carousel.css";

const CarouselComponent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getContents = async () => {
      const data = await fetchKopisData();
      setContents(data.slice(0, 5)); // 🔥 캐러셀에 표시할 5개 데이터만 사용
    };
    getContents();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {contents.map((content, index) => (
          <div key={index} className="carousel-slide">
            <img src={content.poster} alt={content.prfnm} />
            <h3>{content.prfnm}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
