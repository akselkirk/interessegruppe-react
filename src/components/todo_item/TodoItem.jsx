import React from "react";

const TodoItem = ({ key, checked, todoDesc, toggleTodo }) => {
  return (
    <div onClick={toggleTodo}>
      <input type="checkbox" checked={checked} />
      <label>{todoDesc}</label>
    </div>
  );
};

export default TodoItem;
