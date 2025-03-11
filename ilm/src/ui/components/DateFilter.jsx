import React, {useState} from 'react'
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateFilter = ({onDateFilterApply}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  // 종료일이 시작일보다 이전이 되지 않도록 처리
  const handleStartDateChange = (date) => {
    setStartDate(date)
    if (endDate && date > endDate) {
      setEndDate(null)
    }
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  // 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
  const formatDateForApi = (date) => {
    if (!date) return null
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedStartDate = formatDateForApi(startDate)
    const formattedEndDate = formatDateForApi(endDate) || formatDateForApi(new Date())
    // 부모 컴포넌트로 날짜 정보 전달
    onDateFilterApply(formattedStartDate, formattedEndDate)
    console.log(`선택된 기간: ${startDate.toLocaleDateString()} - ${endDate ? endDate.toLocaleDateString() : '지정되지 않음'}`);
    console.log(`API 요청 형식: ${formattedStartDate} - ${formattedEndDate}`)
  }

  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>시작일</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>종료일</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="mt-3">
                  적용
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default DateFilter
