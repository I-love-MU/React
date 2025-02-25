import React from "react"

const Hello = ({name, age, color}) => {
    //prettier-ignore
    // <div style={{ color: props.color}}>
    //   안녕하세요:{props.name} <br/>
    //   색상:{props.color}<br/>
    //   나이:{props.age}<br/>
    // </div>
  return (
    <div style={{color: color}}>
      안녕하세요:{name}<br/>
      색상:{color}<br/>
      나이:{age}<br/>
    </div>
  );
};

export default Hello;