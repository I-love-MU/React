import React, { useState } from 'react'

const Counter2 = () => {
  
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    setNumber(number + 2)
    console.log(number)
  }

  const onDecrease = () => {
    setNumber(number - 2)
    console.log(number)
  }

  //prettier-ignore
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease} >+2</button>
      <button onClick={onDecrease} >-2</button>     
    </div>
  )
}
export default Counter2
