import React, { useState } from "react";
import style from "./number.module.css";

const Number = () => {
  const [count, setCount] = useState(0);

  const handlePluss = () => {
    setCount(count + 1);
  };

  return (
    <div className={style.nummerblokk}>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <p>{count}</p>
      <button onClick={handlePluss}>+</button>
    </div>
  );
};

export default Number;
