import React, { useState } from "react";

const CreateTodo = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleTodoAdd = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleTodoAdd}>
      <input
        placeholder="Todo description"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default CreateTodo;
