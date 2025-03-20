import React from 'react'
import Form from 'react-bootstrap/Form'

const CategoryFilter = ({ checkedBox, onCategoryChange }) => {
  // 카테고리 변경 핸들러
  const handleCategoryFilter = (e) => {
    const name = e.target.name
    const isChecked = e.target.checked
    onCategoryChange(name, isChecked)
  }

  return (
    <Container className='filter-section text-center'>
      <Form className='d-flex justify-content-center align-items-center'>
        <Form.Check
          type='checkbox'
          id='theatrical'
          name='theatrical'
          label='연극'
          onChange={handleCategoryFilter}
          checked={checkedBox === 'theatrical'}
          className='mx-2'
        />
        <Form.Check
          type='checkbox'
          id='concerts'
          name='concerts'
          label='음악/콘서트'
          onChange={handleCategoryFilter}
          checked={checkedBox === 'concerts'}
          className='mx-2'
        />
        <Form.Check
          type='checkbox'
          id='exhibitions'
          name='exhibitions'
          label='전시'
          onChange={handleCategoryFilter}
          checked={checkedBox === 'exhibitions'}
          className='mx-2'
        />
      </Form>
    </Container>
  )
}

export default CategoryFilter
