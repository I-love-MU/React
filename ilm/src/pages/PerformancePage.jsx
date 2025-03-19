import React from 'react'
import PerformanceCarousel from '../components/PerformanceCarousel'

const PerformancePage = () => {
  return (
    <div>
      <PerformanceCarousel title='지금 인기 있는 연극' serviceTp='A' />
      <PerformanceCarousel title='지금 인기 있는 콘서트' serviceTp='B' />
      <PerformanceCarousel title='지금 인기 있는 전시' serviceTp='C' />
    </div>
  )
}

export default PerformancePage
