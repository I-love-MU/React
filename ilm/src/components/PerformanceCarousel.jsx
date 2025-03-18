import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const dummyPerformances = [
  {
    id: 1,
    prfnm: "뮤지컬 해리포터",
    prfpdfrom: "2024-03-01",
    prfpdto: "2024-06-30",
    poster: "https://img.posterstore.com/zoom/wb0101-8harrypotter-thephilosophersstoneno150x70.jpg?auto=compress%2Cformat&fit=max&w=3840",
  },
  {
    id: 2,
    prfnm: "오페라의 유령",
    prfpdfrom: "2024-04-10",
    prfpdto: "2024-07-20",
    poster: "https://image.yes24.com/themusical/fileStorage/ThemusicalAdmin/Play/Image/2023011359034875aea5e53d24394f3e07083edb53594459.jpg",
  },
  {
    id: 3,
    prfnm: "라이온 킹",
    prfpdfrom: "2024-05-05",
    prfpdto: "2024-08-15",
    poster: "https://upload.wikimedia.org/wikipedia/ko/e/ed/%EB%9D%BC%EC%9D%B4%EC%98%A8_%ED%82%B9_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
  },
  {
    id: 4,
    prfnm: "레미제라블",
    prfpdfrom: "2024-06-01",
    prfpdto: "2024-09-10",
    poster: "https://image.yes24.com/themusical/fileStorage/ThemusicalAdmin/Play/Image/2015100205223721052HM28O5QQS38.jpg",
  },
  {
    id: 5,
    prfnm: "위키드",
    prfpdfrom: "2024-07-01",
    prfpdto: "2024-10-30",
    poster: "https://i.namu.wiki/i/qbz594YVvSTJdzcs3sb9YiLC4MsiMes3kYAHz00tOBiIFZwDkRdQA35Dnz2QamLYacPoG4VPC3w1SnzUBWs2EA.webp",
  },
];

const PerformanceCarousel = () => {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 3개의 랜덤 공연 선택
    const shuffled = [...dummyPerformances].sort(() => 0.5 - Math.random());
    setPerformances(shuffled.slice(0, 3));
  }, []);

  return (
    <Container className="mt-4">
      <Carousel interval={5000} controls={true} indicators={true} pause="hover">
        {performances.map((performance) => (
          <Carousel.Item key={performance.id}>
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={performance.poster}
                    alt={performance.prfnm}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{performance.prfnm}</Card.Title>
                    <Card.Text>공연 기간: {performance.prfpdfrom} ~ {performance.prfpdto}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/performance/${performance.id}`)}
                    >
                      상세 보기
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default PerformanceCarousel;
