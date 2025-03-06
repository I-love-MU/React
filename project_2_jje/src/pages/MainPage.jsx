// 📂 src/pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategorySection from "../components/CategorySection";
import CustomCarousel from "../components/Carousel";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { fetchEventData } from "../api/fetchData";

const MainPage = () => {
  const [categoryA, setCategoryA] = useState([]);
  const [categoryB, setCategoryB] = useState([]);
  const [categoryC, setCategoryC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventData = await fetchEventData();
        const categoryAData = eventData.filter((item) => item.genreCode === "A000");
        const categoryBData = eventData.filter((item) => item.genreCode === "B000");
        const categoryCData = eventData.filter((item) => item.genreCode === "D000");

        setCategoryA(categoryAData);
        setCategoryB(categoryBData);
        setCategoryC(categoryCData);
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <CustomCarousel data={categoryA} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CategorySection title="연극" data={categoryA} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CategorySection title="콘서트" data={categoryB} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CategorySection title="전시" data={categoryC} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
