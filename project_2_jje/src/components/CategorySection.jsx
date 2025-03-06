// 📂 src/components/CategorySection.js
import React from "react";
import { Button, Container } from "react-bootstrap";
import CustomCarousel from "./Carousel";

const CategorySection = ({ title, data }) => {
  return (
    <Container className="mt-4">
      <h2 className="mb-3">{title}</h2>
      {data.length > 0 ? <CustomCarousel data={data} /> : <p>해당 콘텐츠가 없습니다.</p>}
      <Button variant="primary" className="mt-3">더 보기</Button>
    </Container>
  );
};

export default CategorySection;
