import React, { useContext } from 'react'
import { CounterContext } from '../contexts/ConterContext'

const CounterContextPage = () => {
  const { count, increment, decrement } = useContext(CounterContext)

  return (
    <div>
      <h1>context 숫자: {count} </h1>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
  )
}

export default CounterContextPage