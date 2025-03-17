import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import bener from '../imgs/bener.jpg'
import { OpenApiDetail } from '../services/DetailService'

const DetailPage = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { contentNum } = location.state || {}

  useEffect(() => {
    const getDetailData = async () => {
      try {
        const detailData = await OpenApiDetail(contentNum)
        setData(detailData)
      } catch (error) {
        console.log(OpenApiDetail(contentNum))
        console.error(error)
      }
    }

    if (contentNum) {
        getDetailData()
    }
  }, [contentNum])

  if (!data) return <div>Loading...</div>

  const getUrl = (data) => data.url && typeof data.url === "string" ? data.url : data.placeUrl

  const getContents = (data) => data.contents1 && typeof data.contents1 === "string" ? data.contents1 : "해당 공연의 정보가 없습니다."

  // 날짜 데이터 가공
  function formatDate(date) {
    if (!date) return '-';

    const dateString = date.toString();
    
    if (dateString.length !== 8) {
      return date; // 원본 데이터를 그대로 반환
    }
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    // YYYY.MM.DD 형식으로 반환
    return `${year}.${month}.${day}`;
  }
  
  return (
    <Container className="py-0 d-flex flex-column justify-content-center align-items-center px-0 mx-auto ">
      <header style={{
        backgroundImage:"url("+bener+")",
        backgroundPosition:"center",
        width: "100%", 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "15vh",
      }}
      className="d-flex align-items-center justify-content-center text-black py-4" >
        <h1>EXHIBITION</h1>
      </header>
      <Row className="align-items-center w-100 my-3">
        <Col xs="auto" className="ps-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </Col>
        <Col className="text-center">
          <h3 className="mb-0">{data.title}</h3>
        </Col>
        <Col xs="auto"></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Row className="g-0"> 
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <Card.Img src={data.imgUrl} alt="이미지 없음" className="img-fluid p-3" />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>상세정보</Card.Title>
                  <Card.Text><strong>기간 |</strong> {formatDate(data.startDate)} ~ {formatDate(data.endDate)}</Card.Text>
                  <Card.Text><strong>장소 |</strong> {data.place} / {data.area}</Card.Text>
                  <Card.Text><strong>주소 |</strong> {data.placeAddr}</Card.Text>
                  <Card.Text><strong>관람료 |</strong> {data.price}</Card.Text>
                  <Card.Text><strong>전화번호 |</strong> {data.phone}</Card.Text>
                  <Card.Text><strong>사이트 |</strong> <a href={getUrl(data)} target="_blank" rel="noopener noreferrer">홈페이지 바로가기</a></Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="p-4 bg-light">
            <h4>About</h4>
            <p>{getContents(data)}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailPage
