import React from 'react'

const InlineStylePage = () => {

  //사전정의 후 지정
  const divStyle = {
    margin: '100px',
    color: 'green',
  };

  return (
    //prettier-ignore
    <div>
      <div style={ {color:"red"} }>인라인 스타일 적용</div>
      {/* 사전정의 후 지정 */}
      <p style={divStyle}>안녕하세요</p>
    </div>
  );
};

export default InlineStylePage
