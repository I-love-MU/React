import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Container} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateFilter = ({onDateFilterApply, resetDates}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  // resetDates prop이 변경될 때 날짜 초기화
  useEffect(() => {
    if (resetDates) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [resetDates])

  // 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
  const formatDateForApi = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  }

  // 부모 컴포넌트에 날짜 정보 전달
  const updateParent = (start, end) => {
    const formattedStartDate = formatDateForApi(start)
    const formattedEndDate = formatDateForApi(end) || ''
    onDateFilterApply(formattedStartDate, formattedEndDate)
  }

  // 종료일이 시작일보다 이전이 되지 않도록 처리
  const handleStartDateChange = (date) => {
    setStartDate(date)
    if (endDate && date > endDate) {
      setEndDate(null)
      updateParent(date, null)
    } else {
      updateParent(date, endDate)
    }
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    updateParent(startDate, date)
  }

  return (
    <Container>
      <Row>
        <Col>
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
        <Col>
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
      </Row>
    </Container>
  )
}

export default DateFilter
