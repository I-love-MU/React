import React, { useState, useEffect } from 'react'
import { getFilteredData } from '../../services/ApiService'
import SearchResults from '../components/SearchResults'
import DateFilter from '../components/DateFilter'

const SearchPage = () => {
  const [displayData, setDisplayData] = useState([])
  const [searchStatus, setSearchStatus] = useState({
    isInitiated: false,
    isPending: false,
  })
  const [error, setError] = useState({
    isError: false,
    message: '',
    type: ''
  })
  
  // 날짜 필터 상태 추가 (현재 날짜로 초기화)
  const [dateFilter, setDateFilter] = useState({
    startDate: '', // 현재 날짜
    endDate: ''    // 현재 날짜
  })

  const defaultCategory = 'D000' // 기본 카테고리 

  // API 데이터 호출
  useEffect(() => {
    if (searchStatus.isPending) {
      const apiKey = import.meta.env.VITE_API_KEY
      const fetchData = async () => {
        setError({ isError: false, message: '', type: '' })
        try {
          const responseData = await getFilteredData(
            apiKey, 
            1, 
            10, 
            defaultCategory, 
            'A', 
            dateFilter.startDate, 
            dateFilter.endDate
          )
          console.log('API 응답 데이터:', responseData)
          
          setDisplayData(responseData)
          
          // 검색 상태 업데이트
          setSearchStatus({
            isInitiated: true,
            isPending: false
          })
        } catch (error) {
          // 에러 처리
          const errorState = {
            isError: true,
            type: 'unknown',
            message: "오류가 발생했습니다"
          }
          if (error.response) {
            errorState.type = 'server'
            errorState.message = `서버에서 오류가 발생했습니다 (${error.response.status})`
          } else if (error.request) {
            errorState.type = 'network'
            errorState.message = "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요."
          } else {
            errorState.type = 'request'
            errorState.message = "요청 설정 중 오류가 발생했습니다"
          }
          setError(errorState)
          setSearchStatus(prev => ({ ...prev, isPending: false }))
        }
      }
      fetchData()
    }
  }, [searchStatus.isPending, dateFilter])

  // 날짜 필터 적용 핸들러
  const handleDateFilterApply = (startDate, endDate) => {
    setDateFilter({
      startDate,
      endDate
    })
    
    // 검색 시작
    setSearchStatus({
      isInitiated: true,
      isPending: true
    })
  }

  const renderContent = () => {
    // 에러가 있는 경우
    if (error.isError) {
      return <div className="alert alert-danger">{error.message}</div>
    }
    
    // 검색 중인 경우
    if (searchStatus.isPending) {
      return <div className="text-center">검색 중입니다...</div>
    }
    
    // 검색 결과가 있는 경우
    if (displayData.length > 0) {
      return <SearchResults filteredData={displayData} />
    }
    
    // 검색 결과가 없는 경우
    if (searchStatus.isInitiated && displayData.length === 0) {
      return <div className="alert alert-info">검색 결과가 없습니다.</div>
    }
    
    return null
  }

  return (
    <div>
      <h2 className="text-center my-4">날짜별 공연/전시 검색</h2>
      <DateFilter onDateFilterApply={handleDateFilterApply} />
      {renderContent()}
    </div>
  )
}

export default SearchPage
