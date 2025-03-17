import React from 'react'
import { useNavigate } from 'react-router-dom'

const testPage = () => {
  const navigate = useNavigate();

  const move_detail = (e) =>{
    navigate('/detail',{
      state:{
        contentNum:e.target.value,
      }
    })
  }

  return (
    <div>testPage
      <button onClick={move_detail} value={309407}> 컨탠트 </button>
    </div>
  )
}

export default testPage