import React, { useEffect, useState } from 'react'
import { fetchOngoingEvents } from '../api/publicApi' // API 호출 함수
import { useNavigate } from 'react-router-dom'
import { Carousel, Container, Row, Col } from 'react-bootstrap' // Bootstrap 레이아웃 추가

const PerformanceCarousel = ({ title, serviceTp }) => {
  const [slides, setSlides] = useState([]) // 슬라이드 데이터
  const [index, setIndex] = useState(0) // 현재 슬라이드 인덱스
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOngoingEvents({
        from: '20250101',
        to: '20251231',
        serviceTp: serviceTp,
        numOfRows: 12, // 12개 가져오기
      })

      if (data.length > 0) {
        const chunkedSlides = []
        for (let i = 0; i < data.length; i += 3) {
          chunkedSlides.push(data.slice(i, i + 3)) // 3개씩 묶기
        }
        setSlides(chunkedSlides)
      }
    }

    fetchData()
  }, [serviceTp])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Container className='performance-section mt-5'>
      <h2 className='mb-4'>{title}</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className='justify-content-center'>
              {group.map((performance) => (
                <Col key={performance.seq} md={4} className='d-flex justify-content-center'>
                  <div
                    className='performance-card text-center p-3 shadow rounded'
                    onClick={() => navigate(`/performance/${performance.seq}`)}
                    style={{
                      cursor: 'pointer',
                      background: 'white',
                      width: '300px',
                      height: '480px',
                    }}
                  >
                    <img
                      src={performance.thumbnail}
                      alt={performance.title}
                      className='img-fluid rounded'
                      style={{
                        width: '100%',
                        height: '350px',
                        objectFit: 'cover',
                      }}
                    />
                    <h5 className='mt-2 text-truncate' style={{ maxWidth: '280px' }}>
                      {performance.title}
                    </h5>
                    <p className='text-muted' style={{ fontSize: '14px' }}>
                      {performance.place} <br />
                      {performance.startDate} ~ {performance.endDate}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default PerformanceCarousel
