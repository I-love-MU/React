import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

// 카테고리 코드 매핑
const realmCode = {
  theatrical: 'A000',
  concerts: 'B000',
  exhibitions: 'D000',
}

const CategoryFilter = ({ updateApiFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryFilter = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
  }

  useEffect(() => {
    if (selectedCategory) {
      updateApiFilter({ realmCode: realmCode[selectedCategory] })
    }
  }, [selectedCategory])

  // 초기화 이벤트 리스너 추가
  useEffect(() => {
    const handleReset = () => {
      setSelectedCategory('')
    }
    window.addEventListener('resetFilters', handleReset)
    return () => {
      window.removeEventListener('resetFilters', handleReset)
    }
  }, [])

  return (
    <div className='filter-section text-center'>
      <Form className='d-flex justify-content-center align-items-center'>
        <Form.Check
          type='radio'
          id='theatrical'
          name='category'
          value='theatrical'
          label='연극'
          onChange={handleCategoryFilter}
          checked={selectedCategory === 'theatrical'}
          className='mx-2'
        />
        <Form.Check
          type='radio'
          id='concerts'
          name='category'
          value='concerts'
          label='음악/콘서트'
          onChange={handleCategoryFilter}
          checked={selectedCategory === 'concerts'}
          className='mx-2'
        />
        <Form.Check
          type='radio'
          id='exhibitions'
          name='category'
          value='exhibitions'
          label='전시'
          onChange={handleCategoryFilter}
          checked={selectedCategory === 'exhibitions'}
          className='mx-2'
        />
      </Form>
    </div>
  )
}

export default CategoryFilter
