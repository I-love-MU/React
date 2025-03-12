import React, { useState, useEffect, useRef } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import DateFilter from '../components/DateFilter'
import CategoryFilter from '../components/CategoryFilter'
import { Card, Button } from 'react-bootstrap'

const SearchPage = () => {
  // api 데이터 및 검색 상태
  const [displayData, setDisplayData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchStatus, setSearchStatus] = useState({
    isInitiated: false,
    isPending: false,
  })

  // 에러처리 상태
  const errorRef = useRef({
    isError: false,
    message: '',
    type: ''
  })

  // 날짜 필터 상태
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  })

  // 필터 적용 상태 (사용자가 적용 버튼을 눌렀을 때만 true)
  const [filtersApplied, setFiltersApplied] = useState(false)

  // 카테고리 필터 상태
  const [checkedBox, setCheckedBox] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // 필터 임시 상태 (적용 버튼 누르기 전)
  const [tempDateFilter, setTempDateFilter] = useState({
    startDate: '',
    endDate: ''
  })
  const [tempCategory, setTempCategory] = useState(null)

  const realmCode = {
    theatrical: 'A000',
    concerts: 'B000',
    exhibitions: 'D000',
    default: 'L000'
  }

  // API 데이터 호출 - 검색 버튼 클릭 시에만 실행
  useEffect(() => {
    if (searchStatus.isPending) {
      const apiKey = import.meta.env.VITE_API_KEY
      const fetchData = async () => {
        // 에러 초기화
        errorRef.current = {
          isError: false,
          message: '',
          type: ''
        }
        
        try {
          // 필터가 적용된 카테고리 사용
          const categoryToUse = selectedCategory || realmCode.default
          
          const responseData = await getFilteredData(
            apiKey,
            1,
            10,
            categoryToUse,
            'A',
            dateFilter.startDate,
            dateFilter.endDate
          )
          
          console.log('API 응답 데이터:', responseData)
          
          // 검색어가 있을 때만 결과 필터링 및 표시
          if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase()
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
          setSearchStatus(prev => ({
            ...prev,
            isPending: false
          }))
        }
      }
      
      fetchData()
    }
  }, [searchStatus.isPending, searchTerm])

  // 검색 처리 함수 - 검색 버튼 클릭 시 호출
  const handleSearch = (term) => {
    setSearchTerm(term)
    
    // 검색 시작 API 호출 트리거
    setSearchStatus({
      isInitiated: true,
      isPending: true   
    })
  }

  // 날짜 필터 임시 저장 핸들러
  const handleDateFilterChange = (startDate, endDate) => {
    setTempDateFilter({
      startDate,
      endDate
    })
  }

  // 카테고리 변경 임시 저장 핸들러
  const handleCategoryChange = (name, isChecked) => {

    // 체크박스 상태 업데이트
    setCheckedBox(isChecked ? name : null)
    setTempCategory(isChecked ? realmCode[name] : null)
  }
  
  // 필터 적용 버튼 핸들러 - API 호출 없이 필터 상태만 업데이트
  const applyFilters = () => {
    // 필터 상태 업데이트
    setDateFilter(tempDateFilter)
    setSelectedCategory(tempCategory)
    setFiltersApplied(true)
    
    console.log('필터가 적용되었습니다. 검색 버튼을 눌러 결과를 확인하세요.')
  }

  const renderContent = () => {
    // 에러가 있는 경우
    if (errorRef.current.isError) {
      return (
        <div className="error-container">
          <h3>오류 발생</h3>
          <p>{errorRef.current.message}</p>
        </div>
      )
    }
    
    // 검색 중인 경우
    if (searchStatus.isPending) {
      return <div className="loading text-center">검색 중...</div>
    }
    
    // 검색 결과가 있는 경우
    if (searchStatus.isInitiated && displayData.length > 0) {
      return <SearchResults filteredData={displayData} />
    }
    
    // 검색 결과가 없는 경우
    if (searchStatus.isInitiated && displayData.length === 0) {
      return <div className="no-results text-center">검색 결과가 없습니다.</div>
    }
    
  }
  
  return (
    <div className="search-page">
      <Card className="filter-card my-4">
        <Card.Body>
          <div className="filter-container">
            <div className="category-filter">
              <CategoryFilter checkedBox={checkedBox} onCategoryChange={handleCategoryChange} />
            </div>
            
            <div className="date-filter">
              <DateFilter onDateFilterApply={handleDateFilterChange} />
            </div>

            <div className='d-flex justify-content-center'>
            <Button 
            variant="primary" 
            onClick={applyFilters}
            className="apply-filter-btn"
            >
            적용
            </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <SearchForm onSearch={handleSearch} />
      {renderContent()}
    </div>
  )
  
  
}

export default SearchPage
