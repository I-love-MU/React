import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

const CategoryFilter = ({ updateApiFilter, apiFilter }) => {
  // 현재 선택된 카테고리를 즉시 반영하기 위한 상태
  const [selectedCategory, setSelectedCategory] = useState('')

  // apiFilter가 변경될 때 동기화
  useEffect(() => {
    const realmCodeMap = {
      A000: 'theatrical',
      B000: 'concerts',
      D000: 'exhibitions',
    }
    setSelectedCategory(realmCodeMap[apiFilter.realmCode] || '')
  }, [apiFilter.realmCode])

  // 카테고리 변경 핸들러
  const handleCategoryFilter = (e) => {
    const name = e.target.name
    const isChecked = e.target.checked

    // 카테고리 코드 매핑
    const realmCode = {
      theatrical: 'A000',
      concerts: 'B000',
      exhibitions: 'D000',
      default: 'L000',
    }

    // 체크박스 상태 업데이트
    if (isChecked) {
      setSelectedCategory(name)
      updateApiFilter({ realmCode: realmCode[name] })
    } else {
      setSelectedCategory('')
      updateApiFilter({ realmCode: realmCode.default })
    }
  }

  return (
    <div className='filter-section text-center'>
      <Form className='d-flex justify-content-center align-items-center'>
        <Form.Check
          type='checkbox'
          id='theatrical'
          name='theatrical'
          label='연극'
          onChange={handleCategoryFilter}
          checked={selectedCategory === 'theatrical'}
          className='mx-2'
        />
        <Form.Check
          type='checkbox'
          id='concerts'
          name='concerts'
          label='음악/콘서트'
          onChange={handleCategoryFilter}
          checked={selectedCategory === 'concerts'}
          className='mx-2'
        />
        <Form.Check
          type='checkbox'
          id='exhibitions'
          name='exhibitions'
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
