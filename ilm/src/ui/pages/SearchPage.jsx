import React, { useState, useEffect, useRef } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import DateFilter from '../components/filter/DateFilter'
import CategoryFilter from '../components/filter/CategoryFilter'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

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
    pageNum: '1',
    numOfRow: '10',
    from: '',
    to: '',
    keyword: '',
    sortStdr: '',
    realmCode: 'L000',
    serviceTp: 'A',
    searchTerm: ''
  })
  
  // 필터 UI 상태 (임시 상태)
  const [uiFilters, setUiFilters] = useState({
    startDate: '',
    endDate: '',
    category: null,
    checkedBox: null,
    searchTerm: ''
  })
  
  // 필터 적용 상태
  const [filtersApplied, setFiltersApplied] = useState(false)
  
  // 에러처리 상태
  const errorRef = useRef({
    isError: false,
    message: '',
    type: ''
  })
  
  // 카테고리 코드 매핑
  const realmCode = {
    theatrical: 'A000',
    concerts: 'B000',
    exhibitions: 'D000',
    default: 'L000'
  }

  // API 데이터 호출 - 검색 버튼 클릭 시에만 실행
  useEffect(() => {
    if (searchStatus.isPending) {
      const fetchData = async () => {
        // 에러 초기화
        errorRef.current = { isError: false, message: '', type: '' }
        
        try {
          const responseData = await getFilteredData(
            apiFilter.current.serviceKey,
            apiFilter.current.pageNum,
            apiFilter.current.numOfRow,
            apiFilter.current.realmCode,
            apiFilter.current.serviceTp,
            apiFilter.current.from,
            apiFilter.current.to
          )
          
          console.log('API 응답 데이터:', responseData)
          
          // 검색어가 있을 때만 결과 필터링 및 표시
          if (apiFilter.current.searchTerm) {
            const lowerCaseSearchTerm = apiFilter.current.searchTerm.toLowerCase()
            const filteredResults = responseData.filter(
              (data) => data.title && data.title.toLowerCase().includes(lowerCaseSearchTerm)
            )
            setDisplayData(filteredResults)
          } else {
            setDisplayData(responseData)
          }
          
          // 검색 상태 업데이트
          setSearchStatus({
            isInitiated: true,
            isPending: false
          })
        } catch (error) {
          // 에러 처리
          if (error.response) {
            errorRef.current.isError = true
            errorRef.current.type = 'server'
            errorRef.current.message = `서버에서 오류가 발생했습니다 (${error.response.status})`
          } else if (error.request) {
            errorRef.current.isError = true
            errorRef.current.type = 'network'
            errorRef.current.message = "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
          } else {
            errorRef.current.isError = true
            errorRef.current.type = 'request'
            errorRef.current.message = "요청 설정 중 오류가 발생했습니다"
          }
          
          // 검색 상태만 업데이트
          setSearchStatus(prev => ({ ...prev, isPending: false }))
        }
      }
      
      fetchData()
    }
  }, [searchStatus.isPending])

  // 검색 처리 함수 - 검색 버튼 클릭 시 호출
  const handleSearch = (term) => {
    // 현재 UI 필터 상태를 API 필터에 적용
    apiFilter.current.searchTerm = term
    apiFilter.current.from = uiFilters.startDate
    apiFilter.current.to = uiFilters.endDate
    apiFilter.current.realmCode = uiFilters.category || realmCode.default
    
    // UI 필터 상태 업데이트
    setUiFilters(prev => ({
      ...prev,
      searchTerm: term
    }))
    
    // 검색 시작 - API 호출 트리거
    setSearchStatus({
      isInitiated: true,
      isPending: true
    })
  }

  // 날짜 필터 임시 저장 핸들러
  const handleDateFilterChange = (startDate, endDate) => {
    setUiFilters(prev => ({
      ...prev,
      startDate,
      endDate
    }))
  }

  // 카테고리 변경 임시 저장 핸들러
  const handleCategoryChange = (name, isChecked) => {
    setUiFilters(prev => ({
      ...prev,
      checkedBox: isChecked ? name : null,
      category: isChecked ? realmCode[name] : null
    }))
  }

  // 필터 적용 버튼 핸들러 - API 호출 없이 필터 상태만 업데이트
  const applyFilters = () => {

    // UI 필터 상태를 API 필터에 적용
    apiFilter.current.from = uiFilters.startDate
    apiFilter.current.to = uiFilters.endDate
    apiFilter.current.realmCode = uiFilters.category || realmCode.default
    
    setFiltersApplied(true)
    console.log('필터가 적용되었습니다. 검색 버튼을 눌러 결과를 확인하세요.')
  }

  const renderContent = () => {

    // 에러가 있는 경우
    if (errorRef.current.isError) {
      return (
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="text-danger">오류 발생</Card.Title>
            <Card.Text>{errorRef.current.message}</Card.Text>
          </Card.Body>
        </Card>
      )
    }

    // 검색 결과가 있는 경우
    if (searchStatus.isInitiated) {
      return <SearchResults filteredData={displayData} />
    }

  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">공연 정보 검색</h2>
      
      {/* 검색창 UI를 화면 가운데로 배치 */}
      <Row className="justify-content-center mb-4">
        <Col md={8} lg={6} className="text-center">
          <SearchForm onSearch={handleSearch} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>날짜 필터</Card.Header>
            <Card.Body>
              <DateFilter onDateFilterApply={handleDateFilterChange} />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>카테고리 필터</Card.Header>
            <Card.Body>
              <CategoryFilter 
                checkedBox={uiFilters.checkedBox}
                onCategoryChange={handleCategoryChange} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col className="text-center">
          <Button 
            variant="primary" 
            onClick={applyFilters}
            className="px-4"
          >
            필터 적용하기
          </Button>
        </Col>
      </Row>
      
      <Row>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  )
}

export default SearchPage
