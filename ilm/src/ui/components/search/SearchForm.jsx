import React, { useState, useRef } from 'react'
import { OpenApiRealm } from '../../../services/OpenApi'
import DateFilter from '../filter/DateFilter'
import CategoryFilter from '../filter/CategoryFilter'
import KeywordFilter from '../filter/KeywordFilter'
import LocationFilterSet from './LocationFilterSet'
import { Form, Button, Container, Row, Col, Offcanvas, Toast, ToastContainer } from 'react-bootstrap'
import { ArrowClockwise } from 'react-bootstrap-icons'

// API 필터 기본값 상수로 선언
const defaultAPI = {
  serviceKey: import.meta.env.VITE_API_DECODE_KEY,
  PageNo: '1',
  numOfrows: '12',
  from: '',
  to: '',
  keyword: '',
  sortStdr: '',
  realmCode: 'L000',
  serviceTp: 'A',
  gpsxfrom: '',
  gpsyfrom: '',
  gpsxto: '',
  gpsyto: '',
}

const SearchForm = ({ onSearch, onSearchResults, searchStatus }) => {
  // 필터 적용 상태
  const [filtersApplied, setFiltersApplied] = useState(false)

  // Offcanvas 상태
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Toast 알림 상태
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // apiFilter를 useRef로 관리
  const apiFilter = useRef({ ...defaultAPI })

  // apiFilter 업데이트 함수

  const updateApiFilter = (filter) => {
    apiFilter.current = {
      ...apiFilter.current,
      ...filter,
    }

    // 필터 초기화 기능의 활성화/비활성화 상태를 결정
    const isFilterApplied =
      apiFilter.current.from !== defaultAPI.from ||
      apiFilter.current.to !== defaultAPI.to ||
      apiFilter.current.realmCode !== defaultAPI.realmCode ||
      apiFilter.current.keyword !== defaultAPI.keyword ||
      apiFilter.current.gpsxfrom !== defaultAPI.gpsxfrom ||
      apiFilter.current.gpsyfrom !== defaultAPI.gpsyfrom ||
      apiFilter.current.gpsxto !== defaultAPI.gpsxto ||
      apiFilter.current.gpsyto !== defaultAPI.gpsyto

    setFiltersApplied(isFilterApplied)

    // Toast 메시지 표시 (LocationFilterSet에서 전달된 경우)
    if (filter.showToast) {
      setToastMessage(filter.toastMessage)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  // 필터 조건만 초기화하는 함수
  const resetFilters = () => {
    // API 필터의 조건 부분만 초기화
    let currentKeyword = apiFilter.current.keyword

    apiFilter.current = {
      ...defaultAPI,
      keyword: currentKeyword,
    }

    // 각 필터 컴포넌트의 상태 초기화를 위한 이벤트 발생
    // 이벤트를 통해 자식 컴포넌트들에게 초기화 신호 전달
    const resetEvent = new CustomEvent('resetFilters')
    window.dispatchEvent(resetEvent)

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
    // Toast 메시지 표시
    setToastMessage('✔️ 필터가 적용되었습니다.')
    setShowToast(true)

    // 3초 후 Toast 자동 닫기
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleSubmit = async (e) => {
    // Form 태그 페이지 새로고침 방지
    e.preventDefault()

    // 부모 컴포넌트의 검색 함수 호출
    onSearch(apiFilter.current.keyword)

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
        <KeywordFilter updateApiFilter={updateApiFilter} />
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
                <ArrowClockwise
                  className='hidden'
                  size={24}
                  color='gray'
                  onClick={resetFilters}
                  disabled={!filtersApplied}
                />{' '}
                초기화
              </Col>
            </Row>
            <hr />

            {/* 날짜 필터 */}
            <Row className='mb-2'>
              <Col>
                <DateFilter updateApiFilter={updateApiFilter} />
              </Col>
            </Row>
            <hr />

            {/* 카테코리 필터 */}
            <Row className='mt-2'>
              <Col>
                <CategoryFilter updateApiFilter={updateApiFilter} />
              </Col>
            </Row>
            <hr />

            {/* 위치 필터 */}
            <Row className='mt-2'>
              <Col>
                <LocationFilterSet updateApiFilter={updateApiFilter} />
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
              <ToastContainer
                className='mt-5'
                position='top-center'
                style={{
                  transform: 'translateX(-50%)', // 중앙 정렬 완성
                  width: 'auto', // 너비 자동 조정
                  opacity: 0.9,
                }}
              >
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
