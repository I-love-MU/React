import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='py-0 px-0 vh-100 d-flex flex-column justify-content-between'>
      <Outlet />
    </div>
  )
}

export default MainLayout
