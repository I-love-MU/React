import React, { useState } from 'react'
import RspCard from '../components/rsp/RspCard'
import rock from '@/assets/rsp/rock.jpg'
import paper from '@/assets/rsp/paper.jpg'
import scissor from '@/assets/rsp/scissor.jpg'

const RspPage = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      username: '당신',
      arrRsp: ['가위', '바위', '보'],
      img: 'https://taegon.kim/wp-content/uploads/2018/05/image-5.png',
    },
    {
      id: 2,
      username: '심판',
      arrRsp: [],
      img: 'https://taegon.kim/wp-content/uploads/2018/05/image-5.png',
    },
    {
      id: 3,
      username: '컴퓨터',
      arrRsp: ['랜덤생성'],
      img: 'https://taegon.kim/wp-content/uploads/2018/05/image-5.png',
    },
  ])

  const handleClick = (event) => {
    console.log(event.target.innerText)

    const rspArr = ['가위', '바위', '보']
    const imgArr = [scissor, rock, paper] //이미지 처리

    //가위바위보 버튼을 누르면 숫자(0,1,2)숫자로 변환
    let user_rsp = rspArr.indexOf(event.target.innerText)

    //컴퓨터 랜덤 생성(0~2)
    let com_rsp = Math.floor(Math.random() * 3)

    //결과 스트링
    let result = getResult(event.target.innerText, rspArr[com_rsp])

    //화면갱신을 위한 설정
    let copyPlayers = [...players]

    //심판 문구넣기 및 컴퓨터 가위바위보 버튼 처리
    copyPlayers[1].arrRsp = [result]
    copyPlayers[2].arrRsp = [rspArr[com_rsp]]

    //이미지 셋팅
    copyPlayers[0].img = imgArr[user_rsp]
    copyPlayers[2].img = imgArr[com_rsp]

    setPlayers(copyPlayers)
  }

  function getResult(you, computer) {
    let result = '비겼습니다'

    if (you == computer) return '비겼습니다'

    if (you == '가위') {
      if (computer == '바위') result = '당신이 졌습니다'

      if (computer == '보') result = '당신이 이겼습니다.'
    }

    if (you == '바위') {
      if (computer == '보') result = '당신이 졌습니다'

      if (computer == '가위') result = '당신이 이겼습니다.'
    }

    if (you == '보') {
      if (computer == '가위') result = '당신이 졌습니다'

      if (computer == '바위') result = '당신이 이겼습니다.'
    }

    return result
  }

  return (
    <main>
      <div className='container mt-5'>
        <div className='row'>
          {players &&
            players.map((player) => {
              return <RspCard player={player} onClick={handleClick}></RspCard>
            })}
        </div>
      </div>
    </main>
  )
}

export default RspPage
