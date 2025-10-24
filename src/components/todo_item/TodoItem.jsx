import React from "react";

const TodoItem = ({ checked, todoDesc, toggleTodo }) => {
  return (
    <div onClick={toggleTodo}>
      <input type="checkbox" checked={checked} />
      <label>{todoDesc}</label>
    </div>
  );
};

export default TodoItem;
