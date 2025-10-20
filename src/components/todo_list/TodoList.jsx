import React from "react";
import TodoItem from "../todo_item/TodoItem";

const TodoList = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.todos.map((todo, i) => {
        return (
          <TodoItem
            key={i}
            checked={todo.checked}
            todoDesc={todo.todoDesc}
            toggleTodo={() => props.toggleTodo(i)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
