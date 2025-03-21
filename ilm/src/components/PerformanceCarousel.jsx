import React, { useEffect, useState } from 'react'
import { fetchOngoingEvents } from '../api/publicApi'
import { useNavigate } from 'react-router-dom'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap' // Bootstrap 컴포넌트 사용
import { formatDate } from '../utils'

const PerformanceCarousel = ({ title, serviceTp }) => {
  const [slides, setSlides] = useState([]) // 슬라이드에 표시할 데이터 그룹
  const [index, setIndex] = useState(0) // 현재 활성 슬라이드 인덱스
  const navigate = useNavigate()

  useEffect(() => {
    // 컴포넌트 마운트 시 데이터 불러오기
    const fetchData = async () => {
      const data = await fetchOngoingEvents({
        from: '20250101',
        to: '20251231',
        serviceTp: serviceTp,
        numOfRows: 12, // 최대 12개 항목을 가져옴
      })

      if (data.length > 0) {
        const chunkedSlides = []
        for (let i = 0; i < data.length; i += 3) {
          chunkedSlides.push(data.slice(i, i + 3)) // 3개씩 묶어서 슬라이드 구성
        }
        setSlides(chunkedSlides)
      }
    }

    fetchData()
  }, [serviceTp])

  const handleSelect = (selectedIndex) => {
    // 캐러셀에서 현재 인덱스 변경
    setIndex(selectedIndex)
  }

  return (
    <Container className='performance-section mt-5'>
      {/* 상단 제목 및 더보기 버튼 */}
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2 className='mb-0'>{title}</h2>
        <Button
          variant='outline-primary'
          size='sm'
          onClick={() => navigate(`/performances/list?category=${serviceTp}`)}
        >
          더보기 →
        </Button>
      </div>

      {/* 캐러셀 */}
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className='justify-content-center'>
              {group.map((performance) => (
                <Col key={performance.seq || Math.random()} md={4} className='d-flex justify-content-center'>
                  {/* 각 공연 카드 */}
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
                      {formatDate(String(performance.startDate))} ~ {formatDate(String(performance.endDate))}
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
