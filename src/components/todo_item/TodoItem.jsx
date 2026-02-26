import React from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ checked, todoDesc, toggleTodo }) => {
  return (
    <div
      className={`${styles.item} ${checked ? styles.checked : ""}`}
      onClick={toggleTodo}
    >
      <input type="checkbox" checked={checked} readOnly />
      <label className={styles.label}>{todoDesc}</label>
    </div>
  );
};

export default TodoItem;
