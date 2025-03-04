import React from 'react'

const StyledComponentPage = () => {
  const StyledDiv = styled.div`
    color:green;
  `

  let 박스 = styled.div`
    padding:20px;
    background-color:red;
  `
  
  let 제목 = styled.h4`
    font-size:35px;
    color:blue;
  `

  return (
    <>
    <StyledDiv>
      <p>스타일컴포넌트입니다.</p>
    </StyledDiv>
    <박스>
      <제목>styled components로 만든 태그</제목>
    </박스>
    </>
    
  )
}

export default StyledComponentPage
