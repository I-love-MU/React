import React, { useState } from 'react';
import RspCard from '../components/rsp/RspCard';
import rock from '@/assets/rsp/rock.jpg';
import paper from '@/assets/rsp/paper.jpg';
import scissor from '@/assets/rsp/scissor.jpg';

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
  ]);

  const handleClick = (event) => {
    console.log(event.target.innerText);

    const rspArr = ['가위', '바위', '보'];
    const imgArr = [scissor, rock, paper];

    // 유저가 선택한 값
    let user_rsp = rspArr.indexOf(event.target.innerText);
    if (user_rsp === -1) return; // 유효하지 않은 입력 방지

    // 컴퓨터가 랜덤 선택
    let com_rsp = Math.floor(Math.random() * 3);

    // 결과 계산
    let result = getResult(rspArr[user_rsp], rspArr[com_rsp]);

    // 기존 상태 배열을 복사한 후 수정
    let copyPlayers = [...players];
    copyPlayers[1] = { ...copyPlayers[1], arrRsp: [result] };
    copyPlayers[2] = { ...copyPlayers[2], arrRsp: [rspArr[com_rsp]] };

    // 이미지 변경
    copyPlayers[0] = { ...copyPlayers[0], img: imgArr[user_rsp] };
    copyPlayers[2] = { ...copyPlayers[2], img: imgArr[com_rsp] };

    setPlayers(copyPlayers);
  };

  function getResult(you, computer) {
    if (you === computer) return '비겼습니다';
    if (
      (you === '가위' && computer === '보') ||
      (you === '바위' && computer === '가위') ||
      (you === '보' && computer === '바위')
    ) {
      return '당신이 이겼습니다!';
    }
    return '당신이 졌습니다';
  }

  return (
    <main>
      <div className='container mt-5'>
        <div className='row'>
          {players.map((player) => (
            <RspCard key={player.id} player={player} onClick={handleClick} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default RspPage;
