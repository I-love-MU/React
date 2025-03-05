import React from 'react'

const Lottoball = ({ lottoNum }) => {
  //번호대별 색상
  const handleColor = (lottoNum) => {
    let color = 'black'

    if (lottoNum <= 10) {
      color = 'gold'
    } else if (lottoNum <= 20) {
      color = 'green'
    } else if (lottoNum <= 30) {
      color = 'gray'
    } else if (lottoNum <= 40) {
      color = 'blue'
    } else {
      color = 'black'
    }
    console.log('색상' + color)

    return color
  }

  return (
    <div class='col-lg-2 mt-3 d-flex justify-content-around'>
      <svg class='rounded-circle' margin='30' width='140' height='140' focusable='false'>
        <rect width='100%' height='100%' fill={handleColor(lottoNum)}></rect>
        <text text-anchor='middle' x='50%' y='50%' fill='white' dy='.3em' font-size='60'>
          {lottoNum}
        </text>
      </svg>
    </div>
  )
}

export default Lottoball