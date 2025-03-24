import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

const MainLayout = () => {
  return (
    <div className='py-0 px-0 vh-100 d-flex flex-column'>
    <NavigationBar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
