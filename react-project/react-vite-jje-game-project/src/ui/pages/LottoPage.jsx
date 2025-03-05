import React, { useState } from 'react'
import Lottoball from '../components/lotto/Lottoball'

const LottoPage = () => {
  const getLottoNums = () => {
    const lottoSet = new Set()

    while (lottoSet.size < 6) {
      let num = Math.floor(Math.random() * 45) + 1
      lottoSet.add(num)
    }

    console.log(lottoSet)

    return Array.from(lottoSet)
  }

  const [nums, setNums] = useState(getLottoNums())

  const onClick = () => {
    setNums(getLottoNums())
  }

  return (
    <>
      <div className='container'>
        <div onClick={onClick} className='row mt-sm-5'>
          {nums &&
            nums.map((num) => {
              return <Lottoball lottoNum={num}></Lottoball>
            })}
        </div>
      </div>
    </>
  )
}

export default LottoPage