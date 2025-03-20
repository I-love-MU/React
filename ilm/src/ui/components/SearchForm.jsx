import React, { useState, useRef } from 'react'
import { OpenApiRealm } from '../../services/ApiService'
import DateFilter from '../components/filter/DateFilter'
import CategoryFilter from '../components/filter/CategoryFilter'
import { Form, Button, Container, Row, Col, Offcanvas, Toast, ToastContainer } from 'react-bootstrap'
import { ArrowClockwise } from 'react-bootstrap-icons'

const SearchForm = ({ onSearch, onSearchResults, searchStatus }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // 필터 적용 상태
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [resetDates, setResetDates] = useState(false)
  const [checkedCategory, setCheckedCategory] = useState('')

  // Offcanvas 상태
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Toast 알림 상태
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // apiFilter를 useRef로 관리
  const apiFilter = useRef({
    serviceKey: import.meta.env.VITE_API_KEY,
    PageNo: '1',
    numOfrows: '12',
    from: '',
    to: '',
    keyword: '',
    sortStdr: '',
    realmCode: 'L000',
    serviceTp: 'A',
  })

  // 디바운싱을 위한 타이머 ref
  const searchTimer = useRef(null)

  // apiFilter 업데이트 함수
  const updateApiFilter = (filter) => {
    apiFilter.current = {
      ...apiFilter.current,
      ...filter,
    }
  }

  // 필터 조건만 초기화하는 함수
  const resetFilters = () => {
    // API 필터의 조건 부분만 초기화
    apiFilter.current = {
      ...apiFilter.current,
      from: '',
      to: '',
      realmCode: 'L000',
    }

    // 날짜 초기화 트리거
    setResetDates((prev) => !prev)
    setCheckedCategory('')

    // 필터 적용 상태 초기화
    setFiltersApplied(false)

    // Toast 메시지 표시
    setToastMessage('✔️ 필터 조건이 초기화되었습니다.')
    setShowToast(true)

    // 3초 후 Toast 자동 닫기
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // 필터 적용 버튼 핸들러 - API 호출 없이 필터 상태만 업데이트
  const applyFilters = () => {
    setFiltersApplied(true)

    // Toast 메시지 표시
    setToastMessage('✔️ 필터가 적용되었습니다.')
    setShowToast(true)

    // 3초 후 Toast 자동 닫기
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // 검색어 변경 시 apiFilter 업데이트 (디바운싱 적용)
  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    // 이전 타이머 취소
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    // 새 타이머 설정 (500ms 후 실행)
    searchTimer.current = setTimeout(() => {
      updateApiFilter({ keyword: newSearchTerm })
    }, 500)
  }

  // 날짜 필터 적용 함수
  const handleDateFilterApply = (startDate, endDate) => {
    updateApiFilter({ from: startDate, to: endDate })
  }

  // 카테고리 필터 변경 함수
  const handleCategoryChange = (name, isChecked) => {
    // 카테고리 코드 매핑
    const realmCode = {
      theatrical: 'A000',
      concerts: 'B000',
      exhibitions: 'D000',
      default: 'L000',
    }

    if (isChecked) {
      setCheckedCategory(name)
      if (name === 'theatrical' || name === 'concerts' || name === 'exhibitions') {
        updateApiFilter({ realmCode: realmCode[name] })
      }
    } else {
      setCheckedCategory('')
      updateApiFilter({ realmCode: realmCode.default })
    }
  }

  const handleSubmit = async (e) => {
    // Form 태그 페이지 새로고침 방지
    e.preventDefault()

    // 부모 컴포넌트의 검색 함수 호출
    onSearch(searchTerm)

    try {
      // API 호출
      const responseData = await OpenApiRealm(apiFilter.current)

      // 검색 결과를 부모 컴포넌트로 전달
      onSearchResults(responseData)
    } catch (error) {
      // 에러 처리
      let errorInfo = {
        isError: true,
        type: 'unknown',
        message: '알 수 없는 오류가 발생했습니다.',
      }

      if (error.response) {
        errorInfo.type = 'server'
        errorInfo.message = `서버에서 오류가 발생했습니다 (${error.response.status})`
      } else if (error.request) {
        errorInfo.type = 'network'
        errorInfo.message = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.'
      } else {
        errorInfo.type = 'request'
        errorInfo.message = '요청 설정 중 오류가 발생했습니다'
      }

      onSearchResults([], errorInfo)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className='d-flex justify-content-center mb-5 gap-3'>
        <Form.Control
          type='text'
          placeholder='공연 이름을 입력하세요'
          value={searchTerm}
          onChange={handleSearchTermChange}
          className='me-2'
          style={{ width: '300px', marginRight: '10px' }}
        />
        <Button variant='primary' type='submit' disabled={searchStatus === 'loading'}>
          검색
        </Button>
        <Button variant='primary' onClick={handleShow}>
          필터
        </Button>
      </Form>

      {/* 필터 섹션 */}
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>필터링 검색</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>
              <Col className='text-start'>
                <p>필터</p>
              </Col>
              <Col className='text-end'>
                <ArrowClockwise className='hidden' size={24} color='gray' onClick={resetFilters} />
              </Col>
            </Row>
            <hr />

            {/* 날짜 필터 */}
            <Row className='mb-2'>
              <Col>
                <DateFilter onDateFilterApply={handleDateFilterApply} resetDates={resetDates} />
              </Col>
            </Row>
            <hr />

            {/* 카테코리 필터 */}
            <Row className='mt-2'>
              <Col>
                <CategoryFilter checkedBox={checkedCategory} onCategoryChange={handleCategoryChange} />
              </Col>
            </Row>
            <hr />

            {/* 필터 적용 버튼 */}
            <Row className='mt-5'>
              <Col className='text-center'>
                <Button variant='primary' onClick={applyFilters} className='mb-4'>
                  필터 적용하기
                </Button>
              </Col>

              {/* Toast 알림 */}
              <ToastContainer className='mt-5'>
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                  <Toast.Header closeButton={false}>
                    <strong className='me-auto'>알림</strong>
                  </Toast.Header>
                  <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
              </ToastContainer>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default SearchForm
