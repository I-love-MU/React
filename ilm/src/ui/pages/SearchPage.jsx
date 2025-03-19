import React, { useState, useRef } from 'react'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import DateFilter from '../components/filter/DateFilter'
import CategoryFilter from '../components/filter/CategoryFilter'
import { Card, Button, Container, Row, Col, Offcanvas, Toast, ToastContainer } from 'react-bootstrap'
import { ArrowClockwise } from 'react-bootstrap-icons'

const SearchPage = () => {
  // 검색 결과 데이터 상태
  const [displayData, setDisplayData] = useState([])

  // 검색 상태
  const [searchStatus, setSearchStatus] = useState({
    isInitiated: false,
    isPending: false,
  })

  // API 요청을 위한 필터 상태를 useRef로 관리
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
    searchTerm: '',
  })

  // 필터 UI 상태 (임시 상태)
  const [uiFilters, setUiFilters] = useState({
    startDate: '',
    endDate: '',
    category: null,
    checkedBox: null,
    searchTerm: '',
  })

  // 필터 적용 상태
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [resetDates, setResetDates] = useState(false)

  // 에러처리 상태
  const errorRef = useRef({
    isError: false,
    message: '',
    type: '',
  })

  // 카테고리 코드 매핑
  const realmCode = {
    theatrical: 'A000',
    concerts: 'B000',
    exhibitions: 'D000',
    default: 'L000',
  }

  // Offcanvas 상태
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Toast 알림 상태
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // 검색 처리 함수 - 검색 버튼 클릭 시 호출
  const handleSearch = (term) => {
    // 현재 UI 필터 상태를 API 필터에 적용
    apiFilter.current.keyword = term // 검색어를 keyword 파라미터에 설정(수정)
    apiFilter.current.from = uiFilters.startDate
    apiFilter.current.to = uiFilters.endDate
    apiFilter.current.realmCode = uiFilters.category || realmCode.default

    // UI 필터 상태 업데이트
    setUiFilters((prev) => ({
      ...prev,
      searchTerm: term,
    }))

    // 검색 시작 - API 호출 트리거
    setSearchStatus({
      isInitiated: true,
      isPending: true,
    })
  }

  // 검색 결과 처리 함수 - SearchForm에서 호출됨
  const handleSearchResults = (results, error = null) => {
    if (error) {
      errorRef.current = {
        isError: true,
        message: error.message,
        type: error.type,
      }
    } else {
      errorRef.current = {
        isError: false,
        message: '',
        type: '',
      }

      // API에서 이미 필터링된 결과를 받아오므로 추가 필터링 없이 결과 표시
      setDisplayData(results)
    }

    // 검색 상태 업데이트
    setSearchStatus({
      isInitiated: true,
      isPending: false,
    })
  }

  // 날짜 필터 임시 저장 핸들러
  const handleDateFilterChange = (startDate, endDate) => {
    setUiFilters((prev) => ({
      ...prev,
      startDate,
      endDate,
    }))
  }

  // 카테고리 변경 임시 저장 핸들러
  const handleCategoryChange = (name, isChecked) => {
    setUiFilters((prev) => ({
      ...prev,
      checkedBox: isChecked ? name : null,
      category: isChecked ? realmCode[name] : null,
    }))
  }

  // 필터 적용 버튼 핸들러 - API 호출 없이 필터 상태만 업데이트
  const applyFilters = () => {
    // UI 필터 상태를 API 필터에 적용
    apiFilter.current.from = uiFilters.startDate
    apiFilter.current.to = uiFilters.endDate
    apiFilter.current.realmCode = uiFilters.category || realmCode.default

    setFiltersApplied(true)

    // Toast 메시지 표시
    setToastMessage('✔️ 필터가 적용되었습니다.')
    setShowToast(true)

    // 3초 후 Toast 자동 닫기
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // 필터 조건만 초기화하는 함수
  const resetFilters = () => {
    // UI 필터 상태 초기화
    setUiFilters({
      startDate: '',
      endDate: '',
      category: null,
      checkedBox: null,
      searchTerm: uiFilters.searchTerm,
    })

    // API 필터의 조건 부분만 초기화
    apiFilter.current = {
      ...apiFilter.current,
      from: '',
      to: '',
      realmCode: 'L000',
    }

    // 날짜 초기화 트리거
    setResetDates((prev) => !prev)

    // 필터 적용 상태 초기화
    setFiltersApplied(false)

    // Toast 메시지 표시
    setToastMessage('✔️ 필터 조건이 초기화되었습니다.')
    setShowToast(true)

    // 3초 후 Toast 자동 닫기
    setTimeout(() => {
      setShowToast(false)
    }, 3000)

    console.log('✔️ 필터 조건이 초기화되었습니다.')
  }

  const renderContent = () => {
    // 에러가 있는 경우
    if (errorRef.current.isError) {
      return (
        <Card className='text-center'>
          <Card.Body>
            <Card.Title className='text-danger'>오류 발생</Card.Title>
            <Card.Text>{errorRef.current.message}</Card.Text>
          </Card.Body>
        </Card>
      )
    }

    // 검색 결과가 있는 경우
    if (searchStatus.isInitiated) {
      return <SearchResults filteredData={displayData} />
    }

    return null
  }

  return (
    <Container className='mt-4'>
      <h1 className='text-start mb-4'>
        <strong>Search</strong>
      </h1>

      {/* SearchForm 가운데 배치 */}
      <Row className='justify-content-center mb-4'>
        <Col className='text-center'>
          <SearchForm
            onSearch={handleSearch}
            onSearchResults={handleSearchResults}
            apiFilter={apiFilter.current}
            searchStatus={searchStatus}
            handleShow={handleShow}
          />
        </Col>
      </Row>

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
                <DateFilter onDateFilterApply={handleDateFilterChange} resetDates={resetDates} />
              </Col>
            </Row>
            <hr />

            {/* 카테코리 필터 */}
            <Row className='mt-2'>
              <Col>
                <CategoryFilter checkedBox={uiFilters.checkedBox} onCategoryChange={handleCategoryChange} />
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

      {/* 검색 결과 출력 */}
      <Row className='text-center'>
        <Col>{renderContent()}</Col>
      </Row>
    </Container>
  )
}

export default SearchPage
