import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
  <>
    <h1 className='text-center mt-5'>메인페이지 입니다.</h1>
    <Link to='/profile'>프로필 페이지</Link>
  </>
  )
}

export default HomePage
