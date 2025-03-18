import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { OpenApiDetail } from '../services/DetailService'
import dayjs from 'dayjs'
import '../style/Detailcss.css' // 별도의 CSS 파일 추가

function DetailPage() {
  const [content, setContent] = useState(null) // 변수명 변경 (data -> content)
  const navigate = useNavigate()
  const location = useLocation()
  const { contentNum } = location.state || {}

 // API 호출 및 데이터 설정
  useEffect(() => {
    const fetchContentDetail = async () => {
      try {
        const detailData = await OpenApiDetail(contentNum)
        console.log("API 응답 데이터:", detailData);
        setContent(detailData[0])
      } catch (error) {
        console.error('에러 발생:', error)
      }
    }

    if (contentNum) {
      fetchContentDetail()
    }
  }, [contentNum])

  // 로딩 처리
  if (!content) {
    return (
      <Container className="loading-container">
        <div className="text-center">Loading...</div>
      </Container>
    )
  }

  // 날짜 포맷팅 (dayjs 활용)
  const formatDate = (date) => {
    if (!date) return '-'
    return dayjs(date.toString()).format('YYYY.MM.DD')
  }

  // URL 가져오기 함수
  const is_Url = (urlsData) => urlsData.url && typeof urlsData.url === 'string' ? urlsData.url : urlsData.placeUrl

  // 콘텐츠 가져오기 함수
  const is_Contents = (contentData) => contentData.contents1 && typeof contentData.contents1 === 'string' ? contentData.contents1 : '해당 공연의 정보가 없습니다.'

  return (
    <Container className="detail-container py-0 d-flex flex-column justify-content-center align-items-center px-0 mx-auto">
      {/* Header */}
      <header className="detail-header d-flex align-items-center justify-content-center text-black py-4">
        <h1>EXHIBITION</h1>
      </header>

      {/* Title Bar */}
      <Row className="align-items-center w-100 my-3">
        <Col xs="auto" className="ps-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </Col>
        <Col className="text-center">
          <h3 className="mb-0">{content.title}</h3>
        </Col>
        <Col xs="auto"></Col>
      </Row>

      {/* Content Details */}
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Detail Card */}
          <Card className="mb-4">
            <Row className="g-0">
              {/* Image Section */}
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <Card.Img src={content.imgUrl} alt="이미지 없음" className="img-fluid p-3" />
              </Col>

              {/* Information Section */}
              <Col md={6}>
                <Card.Body className="justify-content-center" >
                  <Card.Title className="d-flex justify-content-center">상세정보</Card.Title>
                  <Card.Text><strong>기간 |</strong> {formatDate(content.startDate)} ~ {formatDate(content.endDate)}</Card.Text>
                  <Card.Text><strong>장소 |</strong> {content.place} / {content.area}</Card.Text>
                  <Card.Text><strong>주소 |</strong> {content.placeAddr}</Card.Text>
                  <Card.Text><strong>관람료 |</strong> {content.price}</Card.Text>
                  <Card.Text><strong>전화번호 |</strong> {content.phone}</Card.Text>
                  <Card.Text><strong>사이트 | </strong>
                    <a href={is_Url(content)} target="_blank" rel="noopener noreferrer">홈페이지 바로가기</a>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* About Section */}
          <Card className="p-4 bg-light">
            <h4>About</h4>
            <p>{is_Contents(content)}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailPage

