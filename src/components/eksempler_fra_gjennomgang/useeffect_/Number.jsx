import style from "../states/number.module.css";

const Number = ({ count, handlePluss, handleMinus }) => {
  return (
    <div className={style.nummerblokk}>
      <button onClick={handleMinus}>-</button>
      <p>{count}</p>
      <button onClick={handlePluss}>+</button>
    </div>
  );
};

export default Number;
