// src/pages/MainPage.jsx
import React from 'react'
import SimplifiedCarousel from '../components/SimplifiedCarousel'
import ExhibitionBanner from '../components/ExhibitionBanner'
import ExhibitionGrid from '../components/ExhibitionGrid'

const MainPage = () => {
  return (
    <div className='container'>
      <SimplifiedCarousel />
      <ExhibitionGrid/>
    </div>
  )
}

export default MainPage
