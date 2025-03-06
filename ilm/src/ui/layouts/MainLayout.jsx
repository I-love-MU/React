import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'


const MainLayout = () => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-between'>
        <NavigationBar/>
        <Outlet />
    </div>
  )
}

export default MainLayout