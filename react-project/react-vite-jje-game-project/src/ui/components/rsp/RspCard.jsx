import React from 'react';

const RspCard = ({ player, onClick }) => { // props 구조 분해 할당
  return (
    <div className='col-md-4 d-flex justify-content-center'>
      <div className='card' style={{ width: '18rem' }}>
        <img className='card-img-top' src={player.img} alt='...' />
        <div className='card-body text-center'>
          <h5 className='card-title'>{player.username}</h5>
          {player.arrRsp.map((rsp) => (
            <button className='btn btn-primary m-2' key={rsp} onClick={onClick}>
              {rsp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RspCard;
