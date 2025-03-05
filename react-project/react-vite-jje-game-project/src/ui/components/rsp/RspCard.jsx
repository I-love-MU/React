import React from 'react'

const RspCard = () => {
  return (
    <div className='col-md-4 d-flex justify-content-center'>
      <div className='card' style={{ width: '18rem' }}>
        <img className='card-img-top' src={props.player.img} alt='...' />

        <div className='card-body text-center'>
          <h5 className='card-title'>{props.player.username}</h5>
          {props.player.arrRsp.map((rsp) => (
            <button className='btn btn-primary m-2' key='{rsp}' onClick={props.onClick}>
              {rsp}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RspCard
