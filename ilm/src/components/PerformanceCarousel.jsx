import React, { useEffect, useState } from 'react'
import { fetchOngoingEvents } from '../api/publicApi'
import { useNavigate } from 'react-router-dom'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap' // Button 추가
import { formatDate } from '../utils'

const PerformanceCarousel = ({ title, serviceTp }) => {
  const [slides, setSlides] = useState([])
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOngoingEvents({
        from: '20250101',
        to: '20251231',
        serviceTp: serviceTp,
        numOfRows: 12,
      })

      if (data.length > 0) {
        const chunkedSlides = []
        for (let i = 0; i < data.length; i += 3) {
          chunkedSlides.push(data.slice(i, i + 3))
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

      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className='justify-content-center'>
              {group.map((performance) => (
                <Col key={performance.seq || Math.random()} md={4} className='d-flex justify-content-center'>
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
