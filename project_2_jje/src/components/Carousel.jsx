// 📂 src/components/Carousel.jsx
import React from "react";
import { Carousel } from "react-bootstrap";

const CustomCarousel = ({ data }) => {
  return (
    <Carousel interval={5000} fade>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.poster || "default.jpg"} alt={item.title} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
