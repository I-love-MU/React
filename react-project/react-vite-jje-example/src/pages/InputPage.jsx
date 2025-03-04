import { useState } from 'react';

const InputPage = () => {
  const [kor, setKor] = useState(0);
  const [eng, setEng] = useState(0);
  const [math, setMath] = useState(0);
  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onKorChange = (event) => {
    setKor(event.target.value);
  };

  const onEngChange = (event) => {
    setEng(event.target.value);
  };

  const onMathChange = (event) => {
    setMath(event.target.value);
  };

  return (
    <div>
      <h2>성적 입력 페이지</h2>
      <div>
        이름: <input name="name" onChange={onNameChange} value={name} />
        <br />
        <br />
        국어: <input type="number" name="kor" onChange={onKorChange} value={kor} />
        <br />
        <br />
        영어: <input type="number" name="eng" onChange={onEngChange} value={eng} />
        <br />
        <br />
        수학: <input type="number" name="math" onChange={onMathChange} value={math} />
        <br />
        <br />
      </div>
      <div>
        <h3>입력한 정보</h3>
        <p>이름: {name}</p>
        <p>국어 점수: {kor}</p>
        <p>영어 점수: {eng}</p>
        <p>수학 점수: {math}</p>
      </div>
    </div>
  );
};

export default InputPage;
