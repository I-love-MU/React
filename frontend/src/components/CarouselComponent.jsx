import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = ({ contents }) => {
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
    <Slider {...settings}>
      {contents.map((content, index) => (
        <div key={index}>
          <img src={content.poster} alt={content.prfnm} style={{ width: "100%", height: "250px" }} />
          <h3>{content.prfnm}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
