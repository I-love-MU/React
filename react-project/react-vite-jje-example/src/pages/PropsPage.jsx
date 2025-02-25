import React from 'react'
import Hello from '../components/Hello'

const PropsPage = () => {
  /* 파라미터를 만들어서 넘길 수 있음: 왜? 함수니깐. */
  const age = 3
  const name = '홍길동'
  return (
    <div>
      <Hello name={name} age={age} color="red"></Hello>
      <Hello></Hello>
    </div>
  )
}

export default PropsPage
