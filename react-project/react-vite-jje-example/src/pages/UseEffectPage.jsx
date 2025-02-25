import React, { useEffect, useState } from 'react'; // ✅ useEffect 추가

const UseEffectPage = () => {
  const [firstCount, setFirstCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  // useEffect(()=>{
  //   // 화면이 업데이트될때마다 (처음 화면 그릴때 포함함)
  //   console.log(매랜더링마다 실행 ${Date()}); 
  // })

  // 처음 랜더링(마운트)될 때만 실행 (created)
  useEffect(() => {
    console.log(`처음 랜더링될때만 실행 ${Date()}`);
  }, []);
  
  // 컴포넌트가 처음 렌더링된 이후 실행
  //  a나 b가 변경되어 컴포넌트가 재렌더링된 이후 실행
  useEffect(() => {
    console.log(`컴포넌트 변경 ${Date()}`)
  }, [firstCount, secondCount])
  
  // // firstCount 변경될 때 실행
  // useEffect(() => {
  //   console.log(`firstCount가 변경될 때 실행됨: ${firstCount}`);
  // }, [firstCount]);

  // // secondCount 변경될 때 실행
  // useEffect(() => {
  //   console.log(`secondCount가 변경될 때 실행됨: ${secondCount}`);
  // }, [secondCount]);

  const firstCountHandler = () => {
    setFirstCount((prev) => prev + 1);
  };

  const secondCountHandler = () => {
    setSecondCount((prev) => prev + 1);
  };

  return (
    <div className='text-center mt-5'>
      <h1>{firstCount}</h1>
      <button onClick={firstCountHandler}>카운터 증가</button>
      <h1>{secondCount}</h1>
      <button onClick={secondCountHandler}>카운터 증가</button>
    </div>
  );
};

export default UseEffectPage;
