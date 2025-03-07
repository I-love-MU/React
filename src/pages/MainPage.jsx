// 📌 src/pages/MainPage.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategorySection from "../components/CategorySection";

const MainPage = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <h1 className="text-center">🎭 문화 공연 탐색</h1>
          <CategorySection />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
