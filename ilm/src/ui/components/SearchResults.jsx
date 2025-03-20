import React from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'

const SearchResults = ({ filteredData }) => {
  if (!filteredData || filteredData.length == 0) {
    return (
      <Alert variant='light' className='text-center'>
        검색 결과가 없습니다.
      </Alert>
    )
  }

  return (
    <Container className='mt-4'>
      <Row xs={1} md={2} lg={4} className='g-4'>
        {filteredData.map((data, index) => (
          <Col key={index}>
            <Card className='h-100 shadow-sm'>
              <div style={{ height: '100%', overflow: 'hidden' }}>
                {data.thumbnail ? (
                  <Card.Img
                    variant='top'
                    src={data.thumbnail}
                    alt={data.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className='text-center py-5 bg-light'>
                    <p className='mb-0'>이미지 없음</p>
                  </div>
                )}
              </div>
              <Card.Body>
                <Card.Title className='text-truncate'>{data.title}</Card.Title>
                <Card.Text>
                  <strong>장소:</strong> {data.place || '정보 없음'}
                  <br />
                  <strong>기간:</strong> {data.startDate || '정보 없음'} ~ {data.endDate || '정보 없음'}
                  <br />
                  <strong>분류이름:</strong> {data.realmName || '정보 없음'}
                  <br />
                  <strong>분류목록:</strong> {data.serviceName || '정보 없음'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SearchResults
